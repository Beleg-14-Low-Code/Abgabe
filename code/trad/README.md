Implementation des gewählten Anwendungsbeispiels mittels ReactJS

Aus Zeitgründen wurde die Datenbankanbindung außenvor gelassen.

Anleitung zum Ausführen der Anwendung (erfordert Docker):

1. Mit einem Terminal in die Directory code/trad navigieren (die Directory in der dieses File enthalten ist.)

2. Zum Builden eines Images der Anwendung (mit dem Namen client) den folgenen Befehl ausführen:

docker build -f Dockerfile -t client .

3. Um einen COntainer zu erstellen, welcher das client Image ausführt, folgenden Befehl verwenden:

docker run -it -p 4001:3000 client

Port 3000 ist dabei der Port des Containers, auf welchem die React Anwendung ausgeführt wird. Port 4001 ist der Port der Maschine, über welchen auf Port 3000 des
Containers zugegriffen werden kann.

Unter localhost:4001 sollte nun die React ANwendung erreichbar sein.