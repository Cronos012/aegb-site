// Lancé avant l'affichage (index.html). Hors de la page pour que la règle de
// sécurité (Content-Security-Policy) n'autorise que les fichiers du site.

// L'appli ne s'affiche jamais dans le cadre d'un autre site (piège au clic).
;(function () {
  if (window.top !== window.self) {
    try {
      window.top.location.href = window.self.location.href
    } catch (e) {
      document.documentElement.style.display = 'none'
    }
  }
})()

// Sur un téléphone réglé en « version pour ordinateur » ou avec un zoom réduit
// dans Chrome, la page se met en page sur ~1000 px et tout devient minuscule.
// On remet l'appli à la taille d'un téléphone. Un téléphone se reconnaît à son
// écran tactile très allongé (une tablette ne l'est pas).
;(function () {
  var root = document.documentElement
  function fit() {
    var s = window.screen
    var ratio = Math.max(s.width, s.height) / Math.min(s.width, s.height)
    var phone = window.matchMedia('(pointer: coarse)').matches && ratio > 1.8
    root.style.zoom = ''
    root.style.removeProperty('--zoom')
    var width = root.clientWidth
    if (phone && width > 600) {
      var zoom = width / 420
      root.style.zoom = String(zoom)
      root.style.setProperty('--zoom', String(zoom))
    }
  }
  fit()
  window.addEventListener('resize', fit)
  window.addEventListener('orientationchange', fit)
})()
    

// Le thème choisi dans Réglages → Apparence (sur cet appareil), posé avant
// l'affichage pour éviter un flash clair. La même règle est dans src/lib/theme.ts.
;(function () {
  var choice = 'auto'
  try {
    choice = localStorage.getItem('aegb-apparence') || 'auto'
  } catch (e) {}
  var dark = choice === 'sombre' || (choice !== 'clair' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
})()
    
