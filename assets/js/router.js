// Router pour URLs SEO-friendly
(function() {
  // Mapping des URLs aux sections
  const urlMap = {
    '/a-propos/': 'one',
    '/services/': 'two',
    '/cas-clients/': 'three',
    '/contact/': 'four',
    '/politique-confidentialite/': 'five',
    '/': 'one'
  };

  // Meta descriptions pour chaque page
  const metaDescriptions = {
    '/a-propos/': 'Découvrez Ordena et Anna Christina, consultante en gestion documentaire. Services pour particuliers, PME, OBNL et syndicats de copropriété au Québec.',
    '/services/': 'Services complets de gestion documentaire : analyse, organisation numérique, conformité Loi 25 et Loi 16. Pour PME, OBNL, syndicats et particuliers.',
    '/cas-clients/': 'Découvrez nos cas clients : organisation documents numériques, conformité Loi 16 et Loi 25. Résultats concrets de nos interventions.',
    '/contact/': 'Demandez votre consultation gratuite en gestion documentaire. Rendez-vous en soirée et fin de semaine sur rendez-vous.',
    '/politique-confidentialite/': 'Politique de confidentialité d\'Ordena. Apprenez comment nous protégeons vos données personnelles et respectons la Loi 25 du Québec.',
    '/': 'Ordena - Gestion documentaire. Mettons de l\'ordre dans vos documents. Simplifions votre quotidien.'
  };

  // Titres pour chaque page
  const pageTitles = {
    '/a-propos/': 'À Propos d\'Ordena | Gestion Documentaire Montréal',
    '/services/': 'Services Gestion Documentaire | Ordena - Organisation Documents',
    '/cas-clients/': 'Nos Cas Clients | Ordena - Gestion Documentaire Réussie',
    '/contact/': 'Contactez Ordena | Consultation Gestion Documentaire Gratuite',
    '/politique-confidentialite/': 'Politique de Confidentialité - Ordena',
    '/': 'Ordena - Gestion documentaire'
  };

  // Fonction pour obtenir le pathname sans le trailing slash (sauf pour root)
  function getNormalizedPath() {
    let path = window.location.pathname;
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path + '/';
  }

  // Fonction pour naviguer vers une section
  function navigateToSection(path) {
    const sectionId = urlMap[path] || 'one';
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Scroll vers la section
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Mettre à jour la classe active dans le menu
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      // Trouver et activer le bon lien
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === path || 
            (path === '/' && link.getAttribute('href') === '/a-propos/')) {
          link.classList.add('active');
        }
      });

      // Mettre à jour la meta description
      const description = metaDescriptions[path] || metaDescriptions['/'];
      let metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', description);
      }

      // Mettre à jour le title
      const title = pageTitles[path] || pageTitles['/'];
      document.title = title;

      // Mettre à jour le canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', 'https://ordena.ca' + path);
      }
    }
  }

  // Gestion des clics sur les liens de navigation
  document.addEventListener('click', function(e) {
    const navLink = e.target.closest('.nav-link');
    if (navLink) {
      e.preventDefault();
      const href = navLink.getAttribute('href');
      
      // Mettre à jour l'URL
      window.history.pushState({ path: href }, '', href);
      
      // Naviguer vers la section
      navigateToSection(href);
    }
  });

  // Gestion du bouton "retour" du navigateur
  window.addEventListener('popstate', function(e) {
    const path = e.state?.path || '/a-propos/';
    navigateToSection(path);
  });

  // Au chargement initial de la page
  document.addEventListener('DOMContentLoaded', function() {
    const currentPath = getNormalizedPath();
    
    // Si l'URL n'existe pas dans notre map, rediriger vers l'accueil
    if (!urlMap[currentPath]) {
      window.history.replaceState({ path: '/' }, '', '/');
      navigateToSection('/');
    } else {
      navigateToSection(currentPath);
    }
  });

  // Si le DOM est déjà chargé (script chargé après)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      const currentPath = getNormalizedPath();
      if (!urlMap[currentPath]) {
        window.history.replaceState({ path: '/' }, '', '/');
        navigateToSection('/');
      } else {
        navigateToSection(currentPath);
      }
    });
  } else {
    const currentPath = getNormalizedPath();
    if (!urlMap[currentPath]) {
      window.history.replaceState({ path: '/' }, '', '/');
      navigateToSection(currentPath);
    }
  }
})();
