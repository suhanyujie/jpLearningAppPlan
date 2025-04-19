document.addEventListener('DOMContentLoaded', function () {
  const accountInput = document.getElementById('account');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.querySelector('.login-btn');
  const togglePwdBtn = document.querySelector('.toggle-password');
  const loadingMask = document.getElementById('loading-mask');
  const accountError = document.getElementById('account-error');
  const passwordError = document.getElementById('password-error');
  let isPwdVisible = false;

  function validateAccount(value) {
    // 简单校验手机号或邮箱
    const phoneReg = /^1[3-9]\d{9}$/;
    const emailReg = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return '请输入手机号或邮箱';
    if (!phoneReg.test(value) && !emailReg.test(value)) return '格式不正确';
    return '';
  }

  function validatePassword(value) {
    if (!value) return '请输入密码';
    if (value.length < 6) return '密码至少6位';
    return '';
  }

  function updateBtnState() {
    const accVal = accountInput.value.trim();
    const pwdVal = passwordInput.value;
    const accErr = validateAccount(accVal);
    const pwdErr = validatePassword(pwdVal);
    accountError.textContent = accErr;
    passwordError.textContent = pwdErr;
    loginBtn.disabled = !!(accErr || pwdErr);
  }

  accountInput.addEventListener('input', updateBtnState);
  passwordInput.addEventListener('input', updateBtnState);

  togglePwdBtn.addEventListener('click', function () {
    isPwdVisible = !isPwdVisible;
    passwordInput.type = isPwdVisible ? 'text' : 'password';
    togglePwdBtn.classList.toggle('active', isPwdVisible);
  });

  document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    updateBtnState();
    if (loginBtn.disabled) return;
    loadingMask.style.display = 'flex';
    loginBtn.textContent = '登录中...';
    loginBtn.disabled = true;
    setTimeout(function () {
      loadingMask.style.display = 'none';
      loginBtn.textContent = '登录';
      loginBtn.disabled = false;
      // 假设登录失败
      passwordError.textContent = '账号或密码错误';
    }, 1500);
  });

  // 辅助链接点击（可根据实际需求跳转）
  document.querySelector('.forgot-link').addEventListener('click', function (e) {
    e.preventDefault();
    alert('忘记密码功能暂未开放');
  });
  document.querySelector('.register-link').addEventListener('click', function (e) {
    e.preventDefault();
    alert('注册新账号功能暂未开放');
  });

  // 初始化按钮状态
  updateBtnState();
});