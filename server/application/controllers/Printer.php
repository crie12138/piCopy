<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Conf as Conf;
use \QCloud_WeApp_SDK\Cos\CosAPI as Cos;
use \QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Printer extends CI_Controller {
    
    public function getToken() {
        $messArry=$_POST;
        $time=date('Y-m-d h:i:s', time());
        $token=$messArry['mac'].$messArry['name'].$time;
        $token=md5($token);
        try{
            DB::insert("printers",['token'=>$token,'pcname'=>$messArry['name']]);
            $this->json([
                "code"=>0,
                "token"=>$token
            ]);
        }catch(Expection $e){
            $this->json([
                "err"=>$e->getMessage()
            ]);
        }
    }

    public function getShop(){
        $messArry=$_POST;
        $token=$messArry['token'];
        try{
            $row=DB::row('printers',['shop_id'],['token'=>$token]);
            $this->json([
                "code"=>0,
                "shopId"=>$row['shopId']
            ]);
        }catch(Expection $e){
            $this->json([
                "code"=>-1,
                "err"=>$e
            ]);
        }

    }
}
