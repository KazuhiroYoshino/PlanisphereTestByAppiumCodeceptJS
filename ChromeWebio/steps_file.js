// in this file you can append custom step methods to 'I' object

module.exports = function() {
    var connector = require('./connector');
    var weekEnd;
    var firstDay;
    var lastDay;

    let today;
    let dateFrom;
    let dateTo;

  return actor({
        clickPlan: function(plan){
            var selector;
            switch (plan){
            case 'お得な特典付きプラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=0'}));
                break;
            case '素泊まり':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=4'}));
                break;
            case '出張ビジネスプラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=5'}));
                break;
            case 'エステ・マッサージプラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=6'}));
                break;
            case '貸し切り露天風呂プラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=7'}));
                break;
            case 'カップル限定プラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=8'}));
                break;
            case 'テーマパーク優待プラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=9'}));
                break;
            case 'プレミアムプラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=1'}));
                break;
            case 'ディナー付きプラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=2'}));
                break;
            case 'お得なプラン':
                this.click(locate('a').withAttr({href: './reserve.html?plan-id=3'}));
                break;
            default:
            }
        },
        fromDay: function(startDay){
        var selector = "#date";
        var dateFrom;
        	switch (startDay) {
        	case 'Sunday':
                dateFrom = connector.sunday();
                weekEnd = 0;
                firstDay = connector.dateFromSet();
                this.fillField(selector, dateFrom);
                break;
        	case "Monday":
                dateFrom = connector.monday();
                weekEnd = 0;
                firstDay = connector.dateFromSet();
                this.fillField(selector, dateFrom);
                break;
        	case 'Tuesday':
                dateFrom = connector.tuesday();
                weekEnd = 0;
                firstDay = connector.dateFromSet();
                this.fillField(selector, dateFrom);
                break;
        	case 'Wednesday':
                dateFrom = connector.wednesday();
                weekEnd = 0;
                firstDay = connector.dateFromSet();
                this.fillField(selector, dateFrom);
                break;
        	case 'Thursday':
                dateFrom = connector.thursday();
                weekEnd = 0;
                firstDay = connector.dateFromSet();
                this.fillField(selector, dateFrom);
                break;
        	case 'Friday':
                dateFrom = connector.friday();
                weekEnd = 0;
                firstDay = connector.dateFromSet();
                this.fillField(selector, dateFrom);
                break;
        	case 'Saturday':
                dateFrom = connector.saturday();
                weekEnd = 0;
                firstDay = connector.dateFromSet();
                this.fillField(selector, dateFrom);
                break;
            default:
        	}
        },

        seeTerm: function(term){
            var termText = term + "泊";
            this.see(termText);
            this.see(firstDay);
            lastDay = connector.termSet(term);
            this.see(lastDay);
        },

        seeHeadCount: function(headcount){
            var headText = headcount + "名様";
            this.see(headText);
        },

        fillBirthday: function(locator, birthday){
        this.executeScript(function() {
          // now we are inside browser context
          $('birthday').datetimepicker('setDate', '1960-12-11');
        });
        },

        checkBirthday: function(birthday){
            var birthdayString = birthday.substr(0, 4) + '年' + birthday.substr(5, 2) + '月' + birthday.substr(8, 2) + '日';
            this.see(birthdayString);
        },

        seeBill: function(bill, billString){
            var ret;
            billString = billString.replace(',', '');
            billString = billString.replace('円', '');
            billString = billString.replace('（税込み）', '');
            billString = billString.replace('合計', '');
            billString = billString.trim();
            this.assertEqual(bill, billString);
        }
  });
}
