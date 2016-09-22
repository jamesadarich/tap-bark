#!/usr/bin/env node
"use strict";
var tap_bark_1 = require("./src/tap-bark");
var bark = tap_bark_1.TapBark.create();
process.stdin
    .pipe(bark.getPipeable())
    .pipe(process.stdout);
