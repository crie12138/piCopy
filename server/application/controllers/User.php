<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use \Qcloud_WeApp_SDK\Mysql\Mysql as DB;

class User extends CI_Controller {
    public function index() {
        $result = LoginService::check();

        if ($result['loginState'] === Constants::S_AUTH) {
            $userinfo=$result['userinfo'];
            $row=DB::row('users',['*'],[
                'open_id'=>$userinfo['openId']
            ]);
            if($row===NULL)
                DB::insert('users',[
                    'open_id'=>$userinfo['openId'],
                    'nickname'=>$userinfo['nickName'],
                    'avatar'=>$userinfo['avatarUrl']
                 ]);
            $this->json([
                'code' => 0,
                'data' =>$row,
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => []
            ]);
        }
    }
}
