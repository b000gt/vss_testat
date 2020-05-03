# vss_testat

*by Felix Kubli, Patrick Kaufmann & Marc Scherrer*

## Installation

Grundsätzlich läuft alles über docker-compose.
``docker-compose up``
Im ``images`` Ordner finden Sie Beispielbilder. ``marc.jpg`` wird schon verwendet, die anderen können Sie zum hochladen benutzen.

## Benutzung

Anmeldung erfolgt mit **username** ``hsr-user`` und **password** ``123456789``

## Erklärung

Die Verteiltheit des Systems ist nur mässig schön, da in einem Docker Container 4 Instanzen erstellt werden, anstatt 4 Docker Container. Dies ist dadurch entstanden weil wir die Dockerisation erst sehr spät im Projekt gemacht haben und vorher alles auf einer VM getestet haben.