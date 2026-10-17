// Theme toggle. With no saved choice the CSS follows prefers-color-scheme by
// itself; clicking pins an explicit light/dark class and remembers it. The
// button stays hidden without JS, since it couldn't do anything.
(function () {
    var root = document.documentElement;
    var button = document.querySelector('.theme-toggle');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (!button) return;

    function isDark() {
        if (root.classList.contains('dark')) return true;
        if (root.classList.contains('light')) return false;
        return systemDark.matches;
    }

    function render() {
        var next = isDark() ? 'light' : 'dark';
        button.textContent = next === 'light' ? 'Light' : 'Dark';
        button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    }

    button.addEventListener('click', function () {
        var next = isDark() ? 'light' : 'dark';
        root.classList.remove('light', 'dark');
        root.classList.add(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        render();
    });
    systemDark.addEventListener('change', render);

    button.hidden = false;
    render();
})();
