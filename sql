SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET AUTOCOMMIT = 0;

START TRANSACTION;

SET time_zone = "+00:00";

​

​

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

​

--

-- Base de données :  `app_dataera`

--

​

-- --------------------------------------------------------

​

--

-- Structure de la table `liaison_services_url_user`

--

​

DROP TABLE IF EXISTS `liaison_url_user`;

CREATE TABLE IF NOT EXISTS `liaison_url_user` (

  `id_url` int(11) NOT NULL,

  `id_user` int(11) NOT NULL,

  PRIMARY KEY (`id_url`,`id_user`),

  KEY `fk_liaison_url` (`id_url`),

  KEY `fk_liaison_user` (`id_user`)

) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `liaison_services_url`;

CREATE TABLE IF NOT EXISTS `liaison_services_url` (

  `id_services` int(11) NOT NULL AUTO_INCREMENT,

  `id_url` int(11) NOT NULL,

  PRIMARY KEY (`id_services`,`id_url`),

  KEY `fk_liaison_url` (`id_url`),

  KEY `fk_liaison_services` (`id_services`)

) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

​

--

-- Déchargement des données de la table `liaison_services_url_user`

--

​

​

​

-- --------------------------------------------------------

​

--

-- Structure de la table `services`

--

​

DROP TABLE IF EXISTS `services`;

CREATE TABLE IF NOT EXISTS `services` (

  `id_type` int(11) NOT NULL AUTO_INCREMENT,

  `label` varchar(25) COLLATE utf8_unicode_ci NOT NULL,

  PRIMARY KEY (`id_type`)

) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

​

--

-- Déchargement des données de la table `services`

--

​

INSERT INTO `services` (`id_type`, `label`) VALUES

(1, 'CHURN'),

(2, 'RECOMMANDATION'),

(3, 'SEGMENTATION');

​

-- --------------------------------------------------------

​

--

-- Structure de la table `url`

--

​

DROP TABLE IF EXISTS `url`;

CREATE TABLE IF NOT EXISTS `url` (

  `id_url` int(11) NOT NULL AUTO_INCREMENT,

  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,

  PRIMARY KEY (`id_url`)

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

​

--

-- Déchargement des données de la table `url`

--

​

INSERT INTO `url` (`id_url`, `url`) VALUES

(1, 'url');

​

-- --------------------------------------------------------

​

--

-- Structure de la table `utilisateurs`

--

​

DROP TABLE IF EXISTS `utilisateurs`;

CREATE TABLE IF NOT EXISTS `utilisateurs` (

  `id` int(11) NOT NULL AUTO_INCREMENT,

  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
   PRIMARY KEY (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

​

--

-- Déchargement des données de la table `utilisateurs`

--

--

-- Contraintes pour les tables déchargées

--

​

--

-- Contraintes pour la table `liaison_services_url_user`

--

ALTER TABLE `liaison_url_user`

  ADD CONSTRAINT `fk_liaison_url` FOREIGN KEY (`id_url`) REFERENCES `url` (`id_url`) ON DELETE CASCADE ON UPDATE CASCADE,

  ADD CONSTRAINT `fk_liaison_user` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

ALTER TABLE `liaison_services_url`

  ADD CONSTRAINT `fk_liaison_services` FOREIGN KEY (`id_services`) REFERENCES `services` (`id_type`) ON DELETE CASCADE ON UPDATE CASCADE,

  ADD CONSTRAINT `fk_liaison_url` FOREIGN KEY (`id_url`) REFERENCES `url` (`id_url`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

​

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/* ALTER TABLE utilisateurs ADD COLUMN label VARCHAR(250) NOT NULL DEFAULT '' AFTER password ;
   ALTER TABLE utilisateurs ALTER label DROP DEFAULT;
  
*/
