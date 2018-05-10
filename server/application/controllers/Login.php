<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use \Qcloud_WeApp_SDK\Mysql\Mysql as DB;

class Login extends CI_Controller {
    public function index() {
        $result = LoginService::login();
        
        if ($result['loginState'] === Constants::S_AUTH) {
            $this->json([
                'code' => 0,
                'data' => $result['userinfo']
            ]);
        } else {
            $this->json([
                'code' => -1,
                'error' => $result['error']
            ]);
        }
    }
    public function user() {
        $result = LoginService::check();

        if ($result['loginState'] === Constants::S_AUTH) {
            $userInfo=$result['userinfo'];
            $row=DB::row('users',['*'],[
                'open_id'=>$userInfo['openId']
            ]);
            if($row===NULL)
                DB::insert('users',[
                    'open_id'=>$userInfo['openId'],
                    'nickname'=>$userInfo['nickName'],
                    'avatar'=>$userInfo['avatarUrl'],
                 ]);
            $this->json([
                'code' => 0,
                'data' =>$userInfo,
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => []
            ]);
        }
    }
    public function shopkeeper() {
        $result = LoginService::check();
        $isNewShopkeeper=TRUE;
        if ($result['loginState'] === Constants::S_AUTH) {
            $keeperInfo=$result['userinfo'];
            $row=DB::row('shopkeepers',['*'],[
                'open_id'=>$keeperInfo['openId']
            ]);
            if($row===NULL)
                DB::insert('shopkeepers',[
                    'open_id'=>$keeperInfo['openId'],
                    'avatar'=>$keeperInfo['avatarUrl'],
                    'nickname'=>$keeperInfo['nickName'],
                 ]);
            else{
                if(get_object_vars($row)['phone']!=NULL)
                    $isNewShopkeeper=FALSE;
            }
            $this->json([
                'code' => 0,
                'data' =>$keeperInfo,
                'isNewShopkeeper'=>$isNewShopkeeper
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => [],
            ]);
        }
    }
}
