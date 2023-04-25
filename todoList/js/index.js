class ToDoListController {
    totalList = 0;
    getAllToDo() {
        return $('.item').length
            ? [
                  ...$('.item').map(function () {
                      return this.innerText;
                  })
              ]
            : [];
    }
    addSwear() {
        if (this.totalList >= 1) {
            $('.bearLoadMan .sweat:nth-child(3)').show();
            if (this.totalList > 2) {
                $('.bearLoadMan .sweat:nth-child(4)').show();
                if (this.totalList >= 5) {
                    $('.bearLoadMan .sweat:nth-child(5)').show();
                } else {
                    $('.bearLoadMan .sweat:nth-child(5)').hide();
                }
            } else {
                $('.bearLoadMan .sweat:nth-child(4)').hide();
                $('.bearLoadMan .sweat:nth-child(5)').hide();
            }
        } else {
            $('.bearLoadMan .sweat:nth-child(3)').hide();
            $('.bearLoadMan .sweat:nth-child(4)').hide();
            $('.bearLoadMan .sweat:nth-child(5)').hide();
        }
    }
    countHistory() {
        const childNum = $('.discardList .list').children().length;
        const discardNum = ((childNum / this.totalList) * 100).toFixed(2);
        $('.history .discardNum').text(discardNum);
        const childNum2 = $('.doneList .list').children().length;
        const doneNum = ((childNum2 / this.totalList) * 100).toFixed(2);
        $('.history .doneNum').text(doneNum);
    }
    addToDo(text) {
        const prevList = this.getAllToDo();
        if (prevList.find((item) => item == text)) {
            this.addErr('请勿添加重复事件');
            return;
        }

        if (!text) {
            this.addErr('不能添加空的待办');
            return;
        }
        if (this.totalList >= 7) {
            this.addErr('事情太多了，你可以删掉一些再来添加');
            return;
        }
        this.addErr('');
        this.totalList += 1;
        const divCtrl =
            '<div class="ctrlBtn"><div class="del"></div><div class="done"></div></div>';
        $('.bearLoadMan .todoList').prepend(
            `<div class="item" title="${text}">${text}${divCtrl}</div>`
        );
        $('.bearLoadMan .todoList .ctrlBtn .del').on('click', (e) => {
            const parent = $(e.target).parent().parent();
            parent.remove();
            $('.discardList .list').prepend(parent);
            this.countHistory();
            $('.discardList').show();
        });
        $('.bearLoadMan .todoList .ctrlBtn .done').on('click', (e) => {
            const parent = $(e.target).parent().parent();
            parent.remove();
            $('.doneList .list').prepend(parent);
            this.countHistory();
            $('.doneList').show();
        });
        this.addSwear();
    }
    addErr(str) {
        $('#inputErr').text(str);
    }
}
const controller = new ToDoListController();
function addToDo() {
    const input = $('#addText');
    const value = input.val();

    controller.addToDo(value);
    input.val('');
}
const quotations = [
    '打工人，打工魂，打工人都是人上人！',
    '没有困难的工作，只有勇敢的打工人！',
    '这么不努力，怎么做打工人啊你！',
    '这么不努力，怎么做打工人啊你！'
];
function getText() {
    const n = parseInt(Math.random() * quotations.length);
    $('.talkBox').text(quotations[n]);
}
function runner() {
    getText();
    setInterval(() => {
        getText();
    }, 3000);
}
runner();
