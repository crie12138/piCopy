<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class User extends CI_Controller {
    public function getShops(){
        try{
            $rows=DB::select("shops",['id','latitude','longitude','location','page_price']);
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

    public function getShopInfo($shopId){
        try{
            $row=DB::row("shops",['id','name','page_price','location','photo'],['id'=>$shopId]);
            $this->json([
                'code'=>0,
                'shopInfo'=>$row
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }
    }

    public function checkToken($token){
        $tokenVaild=FALSE;
        try{
            $row=DB::row('fileSender',['*'],['user_token'=>$token]);
            $tokenVaild=empty($row);
            if (!$tokenVaild){
                $row=get_object_vars($row);
                $row=DB::row('users',['nickname','id'],['open_id'=>$row['open_id']]);
                $row=get_object_vars($row);
                $this->json([
                    'code'=>0,
                    'tokenVaild'=>!$tokenVaild,
                    'userName'=>$row['nickname'],
                    'id'=>$row['id']
                ]);
            }
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }
    }

    public function registToken(){
        $tokenInfo=$_POST;
        try{
            DB::insert('fileSender',['shop_id'=>$_POST['shopId'],'open_id'=>$_POST['openId'],'user_token'=>$_POST['token']]);
            $this->json([
                'code'=>0
            ]);
        }catch(Expection $e){
            $this->json([
                'code'=>-1,
                'err'=>$e->getMessage()
            ]);
        }
        
    }
}
