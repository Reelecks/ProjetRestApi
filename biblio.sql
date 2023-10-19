-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 18 oct. 2023 à 15:20
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `biblio`
--

DELIMITER $$
--
-- Procédures
--
DROP PROCEDURE IF EXISTS `EmpruntsEnRetard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EmpruntsEnRetard` ()   BEGIN
    SELECT * FROM Emprunts
    WHERE CURDATE() > DateRetourPrevu;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `auteurs`
--

DROP TABLE IF EXISTS `auteurs`;
CREATE TABLE IF NOT EXISTS `auteurs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(100) DEFAULT NULL,
  `Prenom` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auteurs`
--

INSERT INTO `auteurs` (`ID`, `Nom`, `Prenom`) VALUES
(1, 'Verne', 'Jules'),
(2, 'Hugo', 'Victor'),
(3, 'Camus', 'Albert'),
(4, 'Orwell', 'George'),
(5, 'Rowling', 'J.K.'),
(6, 'Austen', 'Jane'),
(7, 'Tolkien', 'J.R.R.'),
(8, 'Shelley', 'Mary'),
(9, 'Fitzgerald', 'F. Scott'),
(10, 'Hemingway', 'Ernest'),
(11, 'Brontë', 'Charlotte'),
(12, 'Lee', 'Harper'),
(13, 'Bradbury', 'Ray'),
(14, 'Dostoevsky', 'Fyodor'),
(15, 'Orwell', 'George'),
(16, 'Woolf', 'Virginia'),
(17, 'Tolkien', 'J.R.R.'),
(18, 'Dickens', 'Charles');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NomCategorie` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`ID`, `NomCategorie`) VALUES
(1, 'Roman'),
(2, 'Science-Fiction'),
(3, 'Poésie'),
(4, 'Fantasy'),
(5, 'Horreur'),
(6, 'Historique'),
(7, 'Biographie'),
(8, 'Mystère'),
(9, 'Autobiographie'),
(10, 'Fantaisie'),
(11, 'Dystopie'),
(12, 'Classique');

-- --------------------------------------------------------

--
-- Structure de la table `editeurs`
--

DROP TABLE IF EXISTS `editeurs`;
CREATE TABLE IF NOT EXISTS `editeurs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NomEditeur` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `editeurs`
--

INSERT INTO `editeurs` (`ID`, `NomEditeur`) VALUES
(1, 'Gallimard'),
(2, 'Folio'),
(3, 'Le Livre de Poche'),
(4, 'Penguin Classics'),
(5, 'Bloomsbury'),
(6, 'HarperCollins'),
(7, 'Simon & Schuster'),
(8, 'Random House'),
(9, 'Doubleday'),
(10, 'Penguin Classics'),
(11, 'Oxford University Press'),
(12, 'HarperCollins');

-- --------------------------------------------------------

--
-- Structure de la table `emprunts`
--

DROP TABLE IF EXISTS `emprunts`;
CREATE TABLE IF NOT EXISTS `emprunts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `LivreISBN` varchar(13) DEFAULT NULL,
  `UtilisateurID` int DEFAULT NULL,
  `DateEmprunt` date DEFAULT NULL,
  `DateRetourPrevu` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `LivreISBN` (`LivreISBN`),
  KEY `UtilisateurID` (`UtilisateurID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `emprunts`
--

INSERT INTO `emprunts` (`ID`, `LivreISBN`, `UtilisateurID`, `DateEmprunt`, `DateRetourPrevu`) VALUES
(1, '9780141441146', 3, '2023-05-05', '2023-06-05'),
(2, '9780747532743', 4, '2023-05-10', '2023-06-10'),
(3, '9780007440832', 5, '2023-05-15', '2023-06-15'),
(4, '9780743273565', 6, '2023-07-10', '2023-08-10'),
(5, '9780061120084', 7, '2023-07-15', '2023-08-15'),
(6, '9781451673319', 8, '2023-07-20', '2023-08-20'),
(7, '9780141442427', 9, '2023-08-25', '2023-09-25'),
(8, '9780451524935', 10, '2023-09-01', '2023-10-01'),
(9, '9780544003415', 11, '2023-09-05', '2023-10-05');

--
-- Déclencheurs `emprunts`
--
DROP TRIGGER IF EXISTS `SetDateRetourPrevu`;
DELIMITER $$
CREATE TRIGGER SetDateRetourPrevu
BEFORE INSERT ON Emprunts
FOR EACH ROW
BEGIN
    SET NEW.DateRetourPrevu = DATE_ADD(NEW.DateEmprunt, INTERVAL 14 DAY);
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS `SetQuantiteLivreAfterEmprunt`;
DELIMITER $$
CREATE TRIGGER SetQuantiteLivreAfterEmprunt
AFTER INSERT ON Emprunts
FOR EACH ROW
BEGIN 
    UPDATE Livres
    SET QuantiteDisponible = QuantiteDisponible - 1
    WHERE ISBN = NEW.LivreISBN;
END;
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `livres`
--

DROP TABLE IF EXISTS `livres`;
CREATE TABLE IF NOT EXISTS `livres` (
  `ISBN` varchar(13) NOT NULL,
  `Titre` varchar(255) DEFAULT NULL,
  `AuteurID` int DEFAULT NULL,
  `AnneePublication` int DEFAULT NULL,
  `QuantiteDisponible` int DEFAULT NULL,
  `CategorieID` int DEFAULT NULL,
  `EditeurID` int DEFAULT NULL,
  PRIMARY KEY (`ISBN`),
  KEY `AuteurID` (`AuteurID`),
  KEY `CategorieID` (`CategorieID`),
  KEY `EditeurID` (`EditeurID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `livres`
--

INSERT INTO `livres` (`ISBN`, `Titre`, `AuteurID`, `AnneePublication`, `QuantiteDisponible`, `CategorieID`, `EditeurID`) VALUES
('9782013233707', 'Vingt mille lieues sous les mers', 1, 1870, 10, 2, 1),
('9782070408055', 'Les Misérables', 2, 1862, 5, 1, 1),
('9782070369561', 'L\'Étranger', 3, 1942, 8, 1, 3),
('9780141441146', '1984', 4, 1949, 7, 1, 4),
('9780747532743', 'Harry Potter à l\'école des sorciers', 5, 1997, 15, 4, 5),
('9780141439518', 'Orgueil et Préjugés', 6, 1813, 5, 1, 4),
('9780007440832', 'Le Seigneur des anneaux', 7, 1954, 10, 4, 6),
('9780141439471', 'Frankenstein', 8, 1818, 8, 2, 4),
('9780743273565', 'Gatsby le Magnifique', 9, 1925, 6, 1, 7),
('9780684801223', 'Le Vieil Homme et la Mer', 10, 1952, 10, 2, 8),
('9780141441147', 'Jane Eyre', 11, 1847, 4, 1, 7),
('9780061120084', 'Ne tirez pas sur l\'oiseau moqueur', 12, 1960, 8, 1, 9),
('9781451673319', 'Fahrenheit 451', 13, 1953, 7, 2, 7),
('9780141442427', 'Crime et Châtiment', 14, 1866, 7, 3, 10),
('9780451524935', '1984', 15, 1949, 10, 2, 11),
('9780156628709', 'Une Chambre à Soi', 16, 1929, 9, 3, 11),
('9780544003415', 'Le Seigneur des Anneaux', 17, 1954, 5, 1, 12),
('9780141439601', 'Oliver Twist', 18, 1838, 8, 3, 10),
('9782070360232', 'Les Frères Karamazov', 14, 1880, 6, 1, 1),
('9782070413113', 'La Ferme des animaux', 15, 1945, 11, 2, 2),
('9782070400301', 'To the Lighthouse', 16, 1927, 7, 1, 3),
('9782070386828', 'Bilbo le Hobbit', 17, 1937, 10, 1, 1),
('9782070407027', 'Hard Times', 18, 1854, 9, 3, 1),
('9782070415964', 'L\'Idiot', 14, 1869, 5, 3, 3),
('9782070364223', 'Homage to Catalonia', 15, 1938, 8, 2, 2),
('9782070420021', 'Mrs Dalloway', 16, 1925, 6, 3, 3),
('9782070416824', 'The Silmarillion', 17, 1977, 5, 2, 1),
('9782070402237', 'A Tale of Two Cities', 18, 1859, 8, 1, 3),
('9782070360245', 'Le Tour du monde en 80 jours', 1, 1873, 10, 2, 1),
('9782070360256', 'Les Travailleurs de la mer', 2, 1866, 12, 1, 2),
('9782070360267', 'La Chute', 3, 1956, 8, 1, 3),
('9782070360278', 'Le Château des Carpathes', 1, 1892, 7, 2, 1),
('9782070360289', 'Notre-Dame de Paris', 2, 1831, 5, 1, 2),
('9782070360290', 'La Peste', 3, 1947, 9, 1, 3),
('9782070360301', 'L’Île mystérieuse', 1, 1874, 11, 2, 1),
('9782070360312', 'L\'Homme qui rit', 2, 1869, 6, 1, 2),
('9782070360323', 'Le Premier Homme', 3, 1995, 10, 1, 3),
('9782070360334', 'Robur le Conquérant', 1, 1886, 10, 2, 1),
('9782070360345', 'Quatrevingt-treize', 2, 1874, 7, 1, 2),
('9782070360356', 'Le Mythe de Sisyphe', 3, 1942, 6, 1, 3),
('9782070360367', 'De la Terre à la Lune', 1, 1865, 12, 2, 1),
('9782070360378', 'Bug-Jargal', 2, 1826, 10, 1, 2),
('9782070360389', 'Les Justes', 3, 1949, 9, 1, 3),
('9782070360390', 'Mathias Sandorf', 1, 1885, 8, 2, 1),
('9782070360401', 'Le Dernier jour d\'un condamné', 2, 1829, 10, 1, 2),
('9782070360412', 'Révolte dans le désert', 3, 1957, 7, 2, 3),
('9782070360423', 'Michel Strogoff', 1, 1876, 11, 1, 1),
('9782070360434', 'Han d\'Islande', 2, 1823, 6, 1, 2),
('9782070360445', 'L\'Hôte', 3, 1957, 5, 1, 3),
('9782070360456', 'Kéraban-le-Têtu', 1, 1883, 10, 2, 1),
('9782070360467', 'Lucrèce Borgia', 2, 1833, 7, 1, 2),
('9782070360478', 'L\'Été', 3, 1954, 9, 1, 3),
('9782070360489', 'L\'Archipel en feu', 1, 1884, 6, 2, 1),
('9782070360490', 'Marion de Lorme', 2, 1821, 5, 1, 2),
('9782070360501', 'Actuelles', 3, 1958, 10, 1, 3),
('9782070360512', 'Les Cinq Cents Millions de la Bégum', 1, 1879, 11, 2, 1),
('9782070360523', 'Le Rhin', 2, 1842, 10, 1, 2),
('9782070360534', 'Noces', 3, 1939, 8, 1, 3),
('978-123456789', 'Les Aventures d\'OpenAI', 1, 2023, 10, 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) DEFAULT NULL,
  `Prenom` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DateInscription` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`ID`, `Nom`, `Prenom`, `Email`, `DateInscription`) VALUES
(1, 'Dupont', 'Marie', 'marie.dupont@email.com', '2023-01-15'),
(2, 'Martin', 'Pierre', 'pierre.martin@email.com', '2023-02-20'),
(3, 'Leroy', 'Sophie', 'sophie.leroy@email.com', '2023-03-05'),
(4, 'Fournier', 'Louis', 'louis.fournier@email.com', '2023-03-10'),
(5, 'Bertrand', 'Claire', 'claire.bertrand@email.com', '2023-04-01'),
(6, 'Blanc', 'Nicolas', 'nicolas.blanc@email.com', '2023-06-05'),
(7, 'Noir', 'Lucie', 'lucie.noir@email.com', '2023-06-15'),
(8, 'Rouge', 'Mathieu', 'mathieu.rouge@email.com', '2023-07-01'),
(9, 'Vert', 'Julien', 'julien.vert@email.com', '2023-08-01'),
(10, 'Bleu', 'Emilie', 'emilie.bleu@email.com', '2023-08-10'),
(11, 'Dupont', 'Jean', 'jean.dupont@email.com', '2023-08-20');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
