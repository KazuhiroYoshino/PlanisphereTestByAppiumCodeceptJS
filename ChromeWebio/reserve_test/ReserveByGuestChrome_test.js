let reserveTestTable = new DataTable(['宿泊プラン','宿泊初日','連泊数','宿泊人数','朝食','昼からチェックインプラン','お得な観光プラン','氏名','確認のご連絡','電話番号','メルアド','ご要望','部屋タイプ','合計料金']);
reserveTestTable.add(['お得な特典付きプラン','Monday','1','1','off','off','off','武田晴信','希望しない','','','off','スタンダードツイン','7000']);
reserveTestTable.add(['出張ビジネスプラン','Saturday','1','1','off','on','off','真田昌虎','メールでのご連絡','','masatora@example.jp','144文字','シングル','10375']);

const message = '123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC123456789ABC12345678';

Feature('Guest予約機能_By_Chrome');

Data(reserveTestTable).Scenario('Guest予約_部屋タイプ確認_料金確認_By_Chrome', async({I , current}) => {
    I.amOnPage('https://hotel.testplanisphere.dev/ja/');
//Guestユーザーで予約
    I.waitForClickable('#navbarNav > ul > li:nth-child(3) > a');
    I.click('宿泊予約');
    I.clickPlan(current.宿泊プラン);
    I.switchToNextTab(1);
    await I.grabValueFrom('#date');
    I.fromDay(current.宿泊初日);
    I.click('閉じる');
    I.fillField('term', current.連泊数);
    I.fillField('head-count', current.宿泊人数);
    if(current.朝食 == 'on'){
        I.checkOption('#breakfast');
    }
    if(current.昼からチェックインプラン == 'on'){
        I.checkOption('#early-check-in');
    }
    if(current.お得な観光プラン == 'on'){
        I.checkOption('#sightseeing');
    }
    I.fillField('username', current.氏名);
    I.selectOption('contact', current.確認のご連絡);
    if(current.確認のご連絡 == 'メールでのご連絡'){
        I.fillField('email', current.メルアド);
    }
    if(current.確認のご連絡 == '電話でのご連絡'){
        I.fillField('tel', current.電話番号)
    }
    if(current.ご要望 == '144文字'){
        I.fillField('comment', message);
    }
    if((current.宿泊プラン == 'お得な特典付きプラン') || (current.宿泊プラン == 'プレミアムプラン') || (current.宿泊プラン == '素泊まり') || (current.宿泊プラン == '出張ビジネスプラン') || (current.宿泊プラン == 'カップル限定プラン')){
        I.switchTo('#room-info > iframe');
        I.see(current.部屋タイプ);
        I.switchTo();
    }else{
        I.see(current.部屋タイプ);
    }
//    I.see(current.合計金額);
    let totalBill = await I.grabTextFrom('#total-bill');
    I.seeBill(current.合計料金, totalBill);

    let term = await I.grabValueFrom('#term');
    let headcount = await I.grabValueFrom('#head-count');
    I.click('予約内容を確認する');
//確認画面
    totalBill = await I.grabTextFrom('#total-bill');
    I.seeBill(current.合計料金, totalBill);
//    I.see(current.合計金額);

    I.seeTerm(term);
    I.seeHeadCount(headcount);
    if(current.朝食 == 'on'){
        I.see('朝食バイキング');
    }
    if(current.昼からチェックインプラン == 'on'){
        I.see('昼からチェックインプラン');
    }
    if(current.お得な観光プラン == 'on') {
        I.see('お得な観光プラン');
    }
    I.see(current.氏名);
    if(current.確認のご連絡 == '希望しない'){
        I.see('希望しない');
    }
    if(current.確認のご連絡 == 'メールでのご連絡'){
    }I.see(current.メルアド);
    if(current.確認のご連絡 == '電話でのご連絡'){
        I.see(current.電話番号);
    }
    if(current.ご要望 == '144文字'){
        I.see(message);
    }
    I.click('この内容で予約する');

//予約完了画面
    I.see('予約を完了しました');
    I.see('ご来館、心よりお待ちしております。');
    I.click('閉じる');
});