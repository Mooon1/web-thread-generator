<?php

namespace ThreadGenerator\Controller;

class ThreadController
{
    public function find(string $file): array
    {
        return json_decode(file_get_contents('cache/' . $file . '.json'), true);
    }
}
