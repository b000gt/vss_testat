# vss_testat

*by [Felix Kubli](mailto:f1kubli@hsr.ch), [Patrick Kaufmann](mailto:pkaufman@hsr.ch) & [Marc Scherrer](mailto:mscherre@hsr.ch)*

[Mail an alle](mailto:f1kubli@hsr.ch,pkaufman@hsr.ch,mscherre@hsr.ch)

## Installation

```bash
git clone https://github.com/b000gt/vss_testat
cd vss_testat
docker-compose up
```

Grundsätzlich läuft alles über ``docker-compose``.
**WICHTIG**:
posgres muss vor backend bereit sein

![startup](./compose_start.PNG)



## Benutzung

Läust auf ``localhost`` bzw ``localhost:80``.

Anmeldung erfolgt mit **username** ``hsr-user`` und **password** ``123456789``.

Im ``images/examples`` Ordner finden Sie Beispielbilder. ``marc.jpg`` wird schon verwendet, die anderen können Sie zum hochladen benutzen.

Bilder sind aus [Unsplash](https://unsplash.com/s/photos/face)

Ein **Click** auf ein Bild (**Face**) gibt eine gewisse Anzahl an **Herzen** (wie eine Währung): z.b _1, 7, 49_.
Hat man eine gewisse Anzahl Herzen gesammelt kann man sich ein neues Face kaufen, für einen **Cost** (Betrag). Dieses neue Face gibt dann mehr Herzen: z.b _343_.

#### Formeln

```latex
cost = 9^{faces.count}
reward = 7^{faces.count}
```

## Erklärung

Über ``docker-compose.yml`` werden 3 Docker Images erstellt.

![idee](architektur.PNG)

![deployment](deployment_diagram.png)

### nginx:1.17

In diesen Container werden 4 Sachen gemounted:

* nginx.conf
  * Dies ist die konfigurations Datei für nginx
* .htpasswd
  * Die passwort Datei für die basic authentication
* frontend/
  * index.html
  * script.js
  * style.css
* images/
  * Der Bilderordner. Wird zusammen mit dem Backend verwendet um die Bilder abzuspeichern

### postgres:12

Dieser Container wird mit environment Variables iniiziert.

```dockerfile
POSTGRES_USER: vss_user
POSTGRES_PASSWORD: '123456789'
POSTGRES_DB: happyface
```

gemounted wird ``init.sql`` um in der Datenbank das erste Bild und der erste click "Behälter" zu erstellen.

Die Daten werden unter postgres-data persistiert über die Laufzeit des Containers.

### backend/dockerfile

``FROM node:12``

In diesem Container wird die Applikation installiert und 4 mal auf 4 verschiedenen ports laufen gelassen:

package.json: 

```json
"system1": "node ./bin/www --port 8084",

"system2": "node ./bin/www --port 8081",

"system3": "node ./bin/www --port 8082",

"system4": "node ./bin/www --port 8083",

"start": "npm run system1 & npm run system2 & npm run system3 & npm run system4"
```

Gemounted wird hier auch der /images Ordner um die Bilder zu speichern.

Die Daten werden über den posrgres Container gespeichert.

