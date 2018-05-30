<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class User extends CI_Controller {
    public function getShops(){
        try{
            $rows=DB::select("shops",['latitude','longitude','location','page_price']);
            $this->json([
                'code'=>0,
                'shops'=>$rows
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }

    }
}
