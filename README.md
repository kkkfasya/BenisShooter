# Benis Shooter
Configurable space invader game

## Installation
```sh
$ git clone --depth=1 https://github.com/kkkfasya/BenisShooter.git
$ cd BenisShooter/
```

## How to run
This game needs server, the simplest way to run is to use python http.server
```sh
$ python3 -m http.server -d .
```
then open src/ directory

## Config
```js
{
  "CostumMusic": false, /* Turn this on for background music (allow autoplay on browser)*/
  "MusicLink": "https://youtu.be/49NvZR8_CCs?si=wX9ZFsbOOs8EKwex", /* Spotify should put back hate forest */
  "PlayerBulletColor": "white",
  "EnemyBulletColor": "red",
  "MaxPlayerAmmo": 4,
  "MaxEnemyAmmo": 10,
  "EnableSfx": true,
  "ArenaWidth": 600,
  "ArenaHeight": 500,
  "PlayerMovSpeed": 1,
  "EnemyMovSpeed": 1,
  "EnemyRow": 6,
  "EnemyCol": 10
}
```
Run ```node music.js``` to install background-music  
Also dont forget to ```npm instal``` before running music.js  
> shoutout to [Coding with Adam](https://youtu.be/qCBiKJbLcFI?si=A16o6J93oDBlFgqB) for the tutorial!!

