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
    public function keeper() {
        $result = LoginService::check();
        $isNewKeeper=TRUE;
        if ($result['loginState'] === Constants::S_AUTH) {
            $keeperInfo=$result['userinfo'];
            $row=DB::row('keepers',['*'],[
                'open_id'=>$keeperInfo['openId']
            ]);
            if($row===NULL)
                DB::insert('keepers',[
                    'open_id'=>$keeperInfo['openId'],
                    'avatar'=>$keeperInfo['avatarUrl'],
                    'nickname'=>$keeperInfo['nickName'],
                ]);
            else{
                $row=get_object_vars($row);
                if($row['avatar']!=$keeperInfo['avatarUrl']){
                    DB::update("keepers",[
                        'avatar'=>$keeperInfo['avatarUrl']
                    ],['open_id'=>$keeperInf['openId']]);
                }
                //检测已注册商家的头像是否有变动
                if($row['phone']!=NULL){
                    $isNewKeeper=FALSE;
                }
                //通过检测商家是否填写过电话号码检测是否注册过
            }
            $this->json([
                'code' => 0,
                'data' =>$keeperInfo,
                'isNewKeeper'=>$isNewKeeper,
            ]);
        } else {
            $this->json([
                'code' => -1,
                'data' => [],
            ]);
        }
    }
}
