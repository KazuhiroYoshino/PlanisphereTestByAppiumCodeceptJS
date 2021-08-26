let reserveTestTable = new DataTable(['メルアド', 'パスワード', '氏名', 'ランク', '住所', '電話', '性別', '生年月日', 'お知らせ']);
reserveTestTable.add(['harunobu@example.jp','password','武田晴信','プレミアム会員','','','その他','','受け取る']);
reserveTestTable.add(['kagetora@example.jp','pass1234','長尾景虎','プレミアム会員','','','男性','1960-12-11','受け取らない']);
reserveTestTable.add(['masatora@example.jp','pass5678','真田昌虎','プレミアム会員','','01234567890','回答しない','','受け取る']);
reserveTestTable.add(['aiko@example.jp','passpass','直江愛子','プレミアム会員','兵庫県加古川市','01234567890','女性','1960-12-11','受け取る']);
reserveTestTable.add(['kanta@example.jp','pass9876','山本寛太','一般会員','兵庫県加古川市','','その他','1960-12-11','受け取らない']);
reserveTestTable.add(['nobuko@example.jp','qwerty1234','武田信子','一般会員','兵庫県加古川市','','回答しない','1960-12-11','受け取る']);
reserveTestTable.add(['ietoki@example.jp','asdfgh9876','柿崎家時','一般会員','兵庫県加古川市','','男性','','受け取らない']);

Feature('会員登録機能_By_Edge');

Data(reserveTestTable).Scenario('会員登録_ログイン_Planメニュー確認_退会', async({I , current}) => {
    I.amOnPage('https://hotel.testplanisphere.dev/ja/');
//会員登録
    I.click('会員登録');
    I.fillField('email', current.メルアド);
    I.fillField('password', current.パスワード);
    I.fillField('password-confirmation', current.パスワード);
    I.fillField('username', current.氏名);
    if(current.ランク == 'プレミアム会員'){
        I.click('input[name="rank"]');
    }
    if(current.ランク == '一般会員'){
        I.click('#rank-normal');
    }
    if((current.住所).length != 0){
        I.fillField('address', current.住所)
    }
    if((current.電話).length != 0){
        I.fillField('tel', current.電話);
    }
    if(current.性別 == '男性'){
        I.selectOption('gender', '男性');
    }
    if(current.性別 == '女性'){
        I.selectOption('gender', '女性');
    }
    if(current.性別 == 'その他'){
        I.selectOption('gender', 'その他');
    }
    if(current.性別 == '回答しない'){
        I.selectOption('gender', '回答しない');
    }
    if((current.生年月日).length != 0){
        let birth = current.生年月日;
        I.executeScript(function(birth) {
//            var bDay = birth;
            var bDay = '1960-12-11';
            $(birthday).val(bDay);
        });
    }
    if(current.お知らせ == '受け取る'){
        I.checkOption('notification');
    }
    I.waitForClickable('#signup-form > button');
    I.click('登録');
    I.waitForClickable('#logout-form > button');
    I.click('ログアウト');

//登録したアカウントで再ログイン。登録内容の検証
    I.waitForClickable('#login-holder > a');
    I.click('ログイン');
    I.fillField('email', current.メルアド);
    I.fillField('password', current.パスワード);
    I.waitForClickable('#login-button');
    I.click('#login-button');
    I.see(current.メルアド);
    I.see(current.氏名);
    I.see(current.ランク)
    if((current.住所).length != 0){
        I.see(current.住所);
    }
    if((current.電話).length != 0){
        I.see(current.電話);
    }
    if(current.性別 == '男性'){
        I.see(current.性別);
    }
    if(current.性別 == '女性'){
        I.see(current.性別);
    }
    if(current.性別 == 'その他'){
        I.see(current.性別);
    }
    if(current.性別 == '回答しない'){
        I.see('未登録');
    }
    if((current.生年月日).length != 0){
        I.checkBirthday(current.生年月日);
    }
    I.see(current.お知らせ);
//宿泊予約メニュー確認
    I.click('宿泊予約');
    I.scrollPageToBottom();
    if(current.ランク == '一般会員'){
        I.dontSee('プレミアムプラン');
        I.see('ディナー付きプラン');
        I.see('お得なプラン');
    }
    if(current.ランク == 'プレミアム会員'){
        I.see('プレミアムプラン');
        I.see('ディナー付きプラン');
        I.see('お得なプラン');
    }

//退会
    I.click('マイページ');
    I.waitForClickable('#delete-form > button');
    I.click('退会する');
   I.seeInPopup('退会すると全ての情報が削除されます。');
    I.acceptPopup();
    I.seeInPopup('退会処理を完了しました。ご利用ありがとうございました。');
    I.acceptPopup();
});
