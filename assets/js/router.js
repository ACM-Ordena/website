// Router pour URLs SEO-friendly sur GitHub Pages
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

  // Fonction pour obtenir le pathname
  function getCurrentPath() {
    let path = window.location.pathname;
    
    if (path === '/' || path === '') {
      return '/';
    }
    
    if (!path.endsWith('/')) {
      path = path + '/';
    }
    
    return path;
  }

  // Fonction pour fermer le menu mobile (important!)
  function closeMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.remove('active');
    }
    // Aussi fermer via body
    const body = document.body;
    if (body.classList.contains('is-menu-visible')) {
      body.classList.remove('is-menu-visible');
    }
  }

  // Fonction pour naviguer vers une section
  function navigateToSection(path) {
    const sectionId = urlMap[path] || 'one';
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Fermer le menu mobile d'abord
      closeMenu();
      
      // Scroll vers la section (petit délai pour laisser le menu se fermer)
      setTimeout(function() {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      
      // Mettre à jour la classe active dans le menu
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      // Trouver et activer le bon lien
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === path || (path === '/' && href === '/a-propos/')) {
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
    const path = e.state?.path || '/';
    navigateToSection(path);
  });

  // Au chargement de la page
  window.addEventListener('DOMContentLoaded', function() {
    const currentPath = getCurrentPath();
    
    // Normaliser l'URL
    if (currentPath !== '/' && !currentPath.endsWith('/')) {
      window.history.replaceState({ path: currentPath + '/' }, '', currentPath + '/');
      navigateToSection(currentPath + '/');
    } else {
      navigateToSection(currentPath);
    }
  });
})();
