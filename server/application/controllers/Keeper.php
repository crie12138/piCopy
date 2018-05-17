<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Keeper extends CI_Controller {
    public function regist(){
        $dataArry=$_POST;
        $code=0;
        $msg=NULL;
        try{
            DB::update("keepers",[
                "real_name"=>$dataArry['realName'],
                "phone"=>intval($dataArry['phone']),
            ],['open_id'=>$dataArry['openId']]);
        }catch(Exception $e){
            $code=-1;
            $msg=$e->getMessage();
        }
        $this->json([
            "code" => $code,
            "data" =>$msg,
            "phone"=>gettype(intval($dataArry['phone'])),
        ]);
    }
   
}