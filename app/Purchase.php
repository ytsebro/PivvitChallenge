<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $hidden = ['updated_at', 'id'];

    public function offering(){
        return $this->hasOne('App\Offering', 'id', 'offering_id');
    }
}
