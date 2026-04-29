import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX } from 'react-icons/fi';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../../services/articleService';
import './ArticlesManager.css';

const ArticlesManager = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = (article = null) => {
    if (article) {
      setEditingArticle(article);
      setTitle(article.title);
      setCategory(article.category);
      setContent(article.content);
    } else {
      setEditingArticle(null);
      setTitle('');
      setCategory('');
      setContent('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, formData);
      } else {
        await createArticle(formData);
      }
      alert("Article successfully saved!");
      closeModal();
      loadData();
    } catch (error) {
      alert("Save failed. Verify backend.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        loadData();
      } catch (e) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">Article CMS Manager</h1>
          <p className="admin-subtitle">Create, update, or remove blog announcements.</p>
        </div>
        <button className="btn btn-primary btn-add" onClick={() => openModal()}>
          <FiPlus /> New Article
        </button>
      </div>

      <div className="admin-table-container glass">
        {isLoading ? (
          <div className="admin-loading">Loading Articles...</div>
        ) : articles.length === 0 ? (
          <div className="admin-empty-state">No articles mapped yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td><span className="badge-user">{article.category}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon edit" onClick={() => openModal(article)}><FiEdit2 /></button>
                      <button className="btn-icon delete" onClick={() => handleDelete(article.id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal glass">
            <div className="admin-modal-header">
              <h3>{editingArticle ? 'Edit Article' : 'Publish Article'}</h3>
              <button className="btn-close-modal" onClick={closeModal}><FiX size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea rows="6" value={content} onChange={e => setContent(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="file-upload-label">
                  <FiUpload /> Choose Image
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                </label>
                {imageFile && <span className="file-name-display">{imageFile.name}</span>}
              </div>
              <div className="admin-modal-footer">
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesManager;
