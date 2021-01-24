const LocalStorageService = (function() {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("access", tokenObj.access);
    localStorage.setItem("refresh", tokenObj.refresh);
  }
  function _getAccessToken() {
    return localStorage.getItem("access");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh");
  }
  function _clearToken() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;
