import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './LoginPage.css';  // ← ADD THIS LINE

const LoginPage = ({ role = 'student' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo login (no backend needed yet)
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Simulate successful login
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ 
          role, 
          name: formData.email.split('@')[0],
          email: formData.email 
        }));
        
        // Redirect based on role
        if (role === 'student') {
          navigate('/student/dashboard');
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        setError('Please fill all fields');
      }
      setLoading(false);
    }, 1500);
  };

  const pageConfig = {
    student: {
      title: 'Student Portal',
      subtitle: 'Access your exams and results',
      icon: '🎓',
      demoEmail: 'student@examportal.com',
      demoPassword: 'password123'
    },
    admin: {
      title: 'Admin Dashboard', 
      subtitle: 'Manage exams and users',
      icon: '⚙️',
      demoEmail: 'admin@examportal.com',
      demoPassword: 'admin123'
    }
  };

  const config = pageConfig[role];

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Back Link */}
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">{config.icon}</div>
            <h1>{config.title}</h1>
            <p>{config.subtitle}</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={config.demoEmail}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={config.demoPassword}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : `Sign in as ${role}`}
            </button>
          </form>

          <div className="demo-info">
            <strong>Demo Credentials:</strong><br/>
            Email: <code>{config.demoEmail}</code><br/>
            Password: <code>{config.demoPassword}</code>
          </div>

          <div className="switch-role">
            {role === 'student' ? (
              <Link to="/login/admin">Login as Admin instead →</Link>
            ) : (
              <Link to="/login/student">Login as Student instead →</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
