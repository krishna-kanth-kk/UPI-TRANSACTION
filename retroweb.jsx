const { useState } = React;

// Y2K CYBERPUNK WEB PORTAL
const BlockUPI = () => {
  // ==================== STATE MANAGEMENT ====================
  const [activeView, setActiveView] = useState('dashboard');
  const [balance, setBalance] = useState(585432.50);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentTransaction, setCurrentTransaction] = useState(null);
  
  const [recentTransactions, setRecentTransactions] = useState([
    { 
      id: 1, 
      name: 'Joseph Joestar', 
      upi: 'joestar@axis', 
      amount: -500, 
      type: 'sent', 
      time: 'TODAY 03:45 PM', 
      block: '0xABC123', 
      gradient: 'linear-gradient(135deg, #00ffff, #bf00ff)' 
    },
    { 
      id: 2, 
      name: 'James Moriarty', 
      upi: 'james@ybl', 
      amount: 2500, 
      type: 'received', 
      time: 'YESTERDAY 02:30 PM', 
      block: '0xDEF456', 
      gradient: 'linear-gradient(135deg, #ff00ff, #00d4ff)' 
    },
    { 
      id: 3, 
      name: 'Elliot Alderson', 
      upi: 'fsociety@okaxis', 
      amount: -250, 
      type: 'sent', 
      time: '2 DAYS AGO', 
      block: '0xGHI789', 
      gradient: 'linear-gradient(135deg, #00ff41, #bf00ff)' 
    },
    { 
      id: 4, 
      name: 'Yabuki Joe', 
      upi: 'yabuki@icici', 
      amount: -500, 
      type: 'sent', 
      time: '3 DAYS AGO', 
      block: '0xKLE241', 
      gradient: 'linear-gradient(135deg, #ffff00, #00ffff)' 
    },
    { 
      id: 5, 
      name: 'Arthur Morgan', 
      upi: 'rdr2@paytm', 
      amount: 1000, 
      type: 'received', 
      time: '5 DAYS AGO', 
      block: '0xDSJ571', 
      gradient: 'linear-gradient(135deg, #ff006e, #00d4ff)' 
    },
    { 
      id: 6, 
      name: 'Spike Spiegel', 
      upi: 'bebop@axis', 
      amount: -1200, 
      type: 'sent', 
      time: '1 WEEK AGO', 
      block: '0xSPK891', 
      gradient: 'linear-gradient(135deg, #ff6b00, #00ffff)' 
    },
  ]);

  const [sendForm, setSendForm] = useState({
    recipientUPI: '',
    recipientName: '',
    amount: '',
    reference: ''
  });

  // ==================== EVENT HANDLERS ====================
  const handleQuickAction = (action) => {
    setActiveView(action);
  };

  const handleSendMoney = () => {
    if (!sendForm.amount || sendForm.amount <= 0) {
      alert('⚠️ ERROR: INVALID AMOUNT');
      return;
    }
    if (!sendForm.recipientUPI || !sendForm.recipientName) {
      alert('⚠️ ERROR: MISSING RECIPIENT INFO');
      return;
    }
    
    const blockHash = '0x' + Math.random().toString(16).substr(2, 12).toUpperCase();
    const newTransaction = {
      id: recentTransactions.length + 1,
      name: sendForm.recipientName,
      upi: sendForm.recipientUPI,
      amount: -parseFloat(sendForm.amount),
      type: 'sent',
      time: 'JUST NOW',
      block: blockHash,
      gradient: 'linear-gradient(135deg, #bf00ff, #00ffff)'
    };

    setCurrentTransaction({
      amount: sendForm.amount,
      recipientName: sendForm.recipientName,
      blockHash: blockHash
    });

    setBalance(prevBalance => prevBalance - parseFloat(sendForm.amount));
    setRecentTransactions([newTransaction, ...recentTransactions]);
    
    setModalType('success');
    setShowModal(true);
    
    setSendForm({
      recipientUPI: '',
      recipientName: '',
      amount: '',
      reference: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveView('dashboard');
  };

  // ==================== COMPONENTS ====================
  
  // Header Component
  const Header = () => (
    <header className="cyber-header">
      <div className="logo">
        <span className="logo-icon">⚡</span>
        <span>BLOCKUPI</span>
      </div>
      
      <div className="header-balance">
        <div className="balance-display">
          <div className="balance-label">TOTAL BALANCE</div>
          <div className="balance-value">
            ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="user-avatar" onClick={() => setActiveView('account')}>
          👤
        </div>
      </div>
    </header>
  );

  // Sidebar Component
  const Sidebar = () => {
    const navItems = [
      { id: 'dashboard', icon: '🏠', label: 'DASHBOARD' },
      { id: 'send', icon: '⚡', label: 'SEND MONEY' },
      { id: 'request', icon: '🔄', label: 'REQUEST' },
      { id: 'transactions', icon: '📊', label: 'HISTORY' },
      { id: 'qr', icon: '📱', label: 'QR CODES' },
      { id: 'account', icon: '⚙️', label: 'SETTINGS' },
    ];

    return (
      <aside className="sidebar">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </aside>
    );
  };

  // Dashboard View
  const Dashboard = () => (
    <div>
      <div className="dashboard-grid">
        <div className="cyber-card">
          <div className="card-title">⚡ AVAILABLE BALANCE</div>
          <div className="card-value">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div className="card-subtitle">SBI • ACCOUNT ****2395</div>
        </div>
        
        <div className="cyber-card">
          <div className="card-title">📊 THIS MONTH</div>
          <div className="card-value">₹{(12450).toLocaleString('en-IN')}</div>
          <div className="card-subtitle">TOTAL TRANSACTIONS</div>
        </div>
        
        <div className="cyber-card">
          <div className="card-title">🔥 STREAK</div>
          <div className="card-value">42 DAYS</div>
          <div className="card-subtitle">DAILY USAGE</div>
        </div>
      </div>

      <div className="quick-actions">
        <div className="action-card" onClick={() => handleQuickAction('send')}>
          <div className="action-icon-large">⚡</div>
          <div className="action-label">SEND MONEY</div>
        </div>
        
        <div className="action-card" onClick={() => handleQuickAction('request')}>
          <div className="action-icon-large">🔄</div>
          <div className="action-label">REQUEST</div>
        </div>
        
        <div className="action-card" onClick={() => handleQuickAction('qr')}>
          <div className="action-icon-large">📱</div>
          <div className="action-label">SCAN QR</div>
        </div>
        
        <div className="action-card" onClick={() => handleQuickAction('qr')}>
          <div className="action-icon-large">🎯</div>
          <div className="action-label">MY QR</div>
        </div>
      </div>

      <div className="transactions-section">
        <div className="section-title">▸ RECENT TRANSACTIONS</div>
        {recentTransactions.slice(0, 5).map(tx => (
          <div key={tx.id} className="transaction-item">
            <div className="tx-avatar" style={{ background: tx.gradient }}>
              {tx.name.split(' ').map(n => n.charAt(0)).join('')}
            </div>
            <div className="tx-info">
              <div className="tx-name">{tx.name.toUpperCase()}</div>
              <div className="tx-details">{tx.upi} • BLOCK: {tx.block}</div>
              <div className="tx-details">{tx.time}</div>
            </div>
            <div className="tx-amount-container">
              <div className="tx-amount" style={{ color: tx.amount > 0 ? '#00ff41' : '#00ffff' }}>
                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount)}
              </div>
              <div className="tx-status" style={{ color: tx.amount > 0 ? '#00ff41' : '#ff006e' }}>
                {tx.type.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Send Money View
  const SendMoneyView = () => (
    <div className="form-container">
      <div className="section-title">⚡ SEND PAYMENT</div>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">▸ RECIPIENT UPI ID</label>
          <input
            type="text"
            className="form-input"
            placeholder="name@bank"
            value={sendForm.recipientUPI}
            onChange={(e) => setSendForm({ ...sendForm, recipientUPI: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">▸ RECIPIENT NAME</label>
          <input
            type="text"
            className="form-input"
            placeholder="Full Name"
            value={sendForm.recipientName}
            onChange={(e) => setSendForm({ ...sendForm, recipientName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">▸ AMOUNT</label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            value={sendForm.amount}
            onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
            min="1"
          />
        </div>

        <div className="form-group">
          <label className="form-label">▸ REFERENCE (OPTIONAL)</label>
          <input
            type="text"
            className="form-input"
            placeholder="Add note"
            value={sendForm.reference}
            onChange={(e) => setSendForm({ ...sendForm, reference: e.target.value })}
          />
        </div>

        <button className="cyber-button" onClick={handleSendMoney}>
          ▸ SEND PAYMENT ▸
        </button>
      </div>
    </div>
  );

  // Transactions View
  const TransactionsView = () => (
    <div>
      <div className="section-title">⚡ TRANSACTION HISTORY</div>
      {recentTransactions.map(tx => (
        <div key={tx.id} className="transaction-item">
          <div className="tx-avatar" style={{ background: tx.gradient }}>
            {tx.name.split(' ').map(n => n.charAt(0)).join('')}
          </div>
          <div className="tx-info">
            <div className="tx-name">{tx.name.toUpperCase()}</div>
            <div className="tx-details">{tx.upi} • BLOCK: {tx.block}</div>
            <div className="tx-details">{tx.time}</div>
          </div>
          <div className="tx-amount-container">
            <div className="tx-amount" style={{ color: tx.amount > 0 ? '#00ff41' : '#00ffff' }}>
              {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount)}
            </div>
            <div className="tx-status" style={{ color: tx.amount > 0 ? '#00ff41' : '#ff006e' }}>
              {tx.type.toUpperCase()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // QR View
  const QRView = () => (
    <div className="form-container">
      <div className="section-title">⚡ QR CODE SYSTEM</div>
      
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '100px', marginBottom: '30px', filter: 'drop-shadow(0 0 30px #00ffff)' }}>📱</div>
        
        <div style={{ 
          width: '300px', 
          height: '300px', 
          margin: '0 auto 40px',
          border: '3px solid #bf00ff',
          background: 'repeating-linear-gradient(45deg, rgba(0, 255, 255, 0.1) 0 2px, transparent 2px 4px), linear-gradient(135deg, #bf00ff, #00ffff)',
          backgroundSize: '20px 20px, 100%',
          boxShadow: '0 0 60px rgba(191, 0, 255, 0.7)',
          clipPath: 'polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '80px'
        }}>
          ⚡
        </div>

        <div style={{
          background: 'rgba(0, 255, 255, 0.1)',
          padding: '20px',
          border: '2px solid #00ffff',
          marginBottom: '30px',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '14px',
          color: '#00ffff',
          letterSpacing: '2px',
          clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)'
        }}>
          blockupi://pay?upi=krishna.kanth@sbi
        </div>

        <button className="cyber-button" onClick={() => alert('✅ LINK COPIED!')}>
          📋 COPY QR LINK
        </button>
      </div>
    </div>
  );

  // Account View
  const AccountView = () => (
    <div className="form-container">
      <div className="section-title">⚡ ACCOUNT SETTINGS</div>
      
      <div className="cyber-card" style={{ marginBottom: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>👤</div>
        <div className="card-title">KRISHNA KANTH</div>
        <div className="card-subtitle">+91 98765 43210</div>
      </div>

      <div className="cyber-card" style={{ marginBottom: '20px' }}>
        <div className="card-title">▸ LINKED ACCOUNTS</div>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(0, 255, 255, 0.1)', border: '1px solid rgba(0, 255, 255, 0.3)' }}>
            <span style={{ color: '#00ffff', fontWeight: '700' }}>SBI • ****2395</span>
            <span style={{ color: '#00ff41', fontSize: '12px', textTransform: 'uppercase' }}>PRIMARY</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(0, 255, 255, 0.05)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
            <span style={{ color: '#00ffff', fontWeight: '700' }}>HDFC • ****7654</span>
            <span style={{ color: '#c0c0c0', fontSize: '12px', textTransform: 'uppercase' }}>LINKED</span>
          </div>
        </div>
      </div>

      <div className="cyber-card">
        <div className="card-title">▸ SECURITY</div>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(0, 255, 255, 0.1)', border: '1px solid rgba(0, 255, 255, 0.3)' }}>
            <span style={{ color: '#00ffff', fontWeight: '700' }}>UPI PIN</span>
            <span style={{ color: '#bf00ff', fontSize: '14px' }}>●●●●</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(0, 255, 255, 0.05)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
            <span style={{ color: '#00ffff', fontWeight: '700' }}>DAILY LIMIT</span>
            <span style={{ color: '#00ff41', fontSize: '14px' }}>₹1,00,000</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Request View
  const RequestView = () => (
    <div className="form-container">
      <div className="section-title">⚡ REQUEST PAYMENT</div>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">▸ RECIPIENT PHONE/UPI</label>
          <input
            type="text"
            className="form-input"
            placeholder="Phone or UPI ID"
          />
        </div>

        <div className="form-group">
          <label className="form-label">▸ AMOUNT TO REQUEST</label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            min="1"
          />
        </div>

        <button className="cyber-button" onClick={() => {
          setModalType('request');
          setShowModal(true);
        }}>
          ▸ GENERATE REQUEST ▸
        </button>
      </div>
    </div>
  );

  // Success Modal
  const SuccessModal = () => (
    <div className={`modal-overlay ${showModal && modalType === 'success' ? 'active' : ''}`}>
      <div className="modal-content">
        <div className="modal-icon" style={{ color: '#00ff41' }}>✅</div>
        <div className="modal-title">PAYMENT SUCCESS</div>
        <div style={{ fontSize: '40px', fontWeight: '900', color: '#00ffff', textShadow: '0 0 30px #00ffff', margin: '20px 0', fontFamily: "'Orbitron', monospace" }}>
          -₹{currentTransaction?.amount || '0'}
        </div>
        <div style={{ fontSize: '14px', color: '#c0c0c0', marginBottom: '10px' }}>
          SENT TO {currentTransaction?.recipientName?.toUpperCase() || 'USER'}
        </div>
        <div style={{ fontSize: '12px', color: '#00ffff', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '1px' }}>
          BLOCK: {currentTransaction?.blockHash || '0x...'}
        </div>
        <button className="cyber-button" onClick={closeModal}>
          ▸ DONE ▸
        </button>
      </div>
    </div>
  );

  // Request Modal
  const RequestModal = () => (
    <div className={`modal-overlay ${showModal && modalType === 'request' ? 'active' : ''}`}>
      <div className="modal-content">
        <div className="modal-icon" style={{ color: '#00ff41' }}>✅</div>
        <div className="modal-title">REQUEST SENT</div>
        <div style={{ fontSize: '40px', fontWeight: '900', color: '#00ffff', textShadow: '0 0 30px #00ffff', margin: '20px 0', fontFamily: "'Orbitron', monospace" }}>
          ₹1,000
        </div>
        <div style={{ fontSize: '14px', color: '#c0c0c0', marginBottom: '20px' }}>
          PAYMENT REQUEST SENT SUCCESSFULLY
        </div>
        <button className="cyber-button" onClick={closeModal}>
          ▸ DONE ▸
        </button>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <div className="cyber-container">
      <Header />
      
      <div className="main-content">
        <Sidebar />
        
        <div className="content-area">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'send' && <SendMoneyView />}
          {activeView === 'transactions' && <TransactionsView />}
          {activeView === 'qr' && <QRView />}
          {activeView === 'account' && <AccountView />}
          {activeView === 'request' && <RequestView />}
        </div>
      </div>

      <SuccessModal />
      <RequestModal />
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BlockUPI />);
