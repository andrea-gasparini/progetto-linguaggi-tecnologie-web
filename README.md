# Progetto Linguaggi e Tecnologie per il Web

L'idea del progetto, ispirata al periodo di distanza che si è vissuto a causa del Covid-19, è stata quella di sviluppare una **piattaforma web di condivisione** per studenti e gruppi di studio. 

Le funzionalità implementate sono le seguenti:
1. Autenticazione utente
	- **Login utente**
	- **Registrazione utente**
2. Gestione gruppo
	- **Creazione del gruppo**
	- **Eliminazione del gruppo**
	- **Sistema di invito al gruppo**
	- **Visualizzazione membri del gruppo**
3. Gestione profilo utente
	- **Modifica indirizzo email**
	- **Modifica della password**
	- **Modifica dell'immagine di profilo utente**
4. Post e commenti
	- **Creazione di post con upload file all'interno dei gruppi**
	- **Possibilità di commentare i post**
	- **Eliminazione del post creato**
5. Chat real time del gruppo
	- **Possibilità di chattare in tempo reale con gli altri membri del gruppo attivi nello stesso momento**

## Tecnologie utilizzate ##
Per quanto riguarda il lato **front-end** è stata utilizzata la libreria [ReactJS](https://it.reactjs.org/) e parte delle classi css di [Bootstrap](https://getbootstrap.com/), oltre alle utilty di layout come [Grid System](https://getbootstrap.com/docs/4.0/layout/grid/) e [Flex](https://getbootstrap.com/docs/4.4/utilities/flex/).
Per il **back-end** abbiamo, invece, due linguaggi differenti: **PHP** per gestire le richieste _API_ degli utenti, e **NodeJS** per gestire il real time della chat. 
Nello specifico le richieste API son state sviluppate attraverso l'utilizzo del framework [Codeigniter 3.1.11](https://codeigniter.com/), mentre la gestione real time è stata sviluppata attraverso la libreria [Socket.io](https://socket.io).

## Installazione ed esecuzione ##
Innanzitutto c'è bisogno di un [Web Server](https://it.wikipedia.org/wiki/Server_web), locale o non, e di [npm](https://www.npmjs.com/).
Per il front-end basterà digitare il comando `npm install` per installare tutte le dipendenze che sono nel file `package.json`. Una volta installate, basterà digitare `npm run start` e si avrà la versione di development attiva sulla porta **8080**, altrimenti `npm run build` per avere una versione di production.

Il back-end si divide in tre parti: il server **PHP**, il server **NodeJS** e il database. Iniziamo dal secondo che è più facile.
Come per il frontend bisogna digitare il comando `npm install` e successivamente `npm run start`, in questa maniera il server verrà avviato su una determinata porta.
Per il PHP, invece, bisogna importare tutto il contenuto della directory `backend/server/` all'interno del web server che si sta usando (xampp, IIS, nginx, etc). 
Per poter configuare il framework Codeigniter bisognerà andare nel file `application/config/config.php` per modificare l'URL del proprio sito per le richieste API e in `application/config/database.php` per modificare utente, password e database di postgresql.
Come ultimo passo andrà importato il database.  La struttura di quest'ultimo si trova nel file `back-end/database/structure.sql`. Basterà semplicemente importare questo file all'interno di un database postgresql.
		
## Autori ##
&copy; 2020 **[Andrea Gasparini](https://github.com/andrea-gasparini)** & **[Edoardo Di Paolo](https://github.com/aedoardo)**.
