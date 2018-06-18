/**
 *  @description Скрипт для рассылки сообщений в WhatsApp через Web-версию https://web.whatsapp.com/
 *  @since Mon Jun 18 2018 03:02:34 GMT+0300 (Москва, стандартное время)
 *  @author AlexanderFSP<https://github.com/AlexanderFSP>
 */

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const distributionPath = '/Users/mymac/Desktop/Рассылка.csv';
const separator = ';';   // or ','
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 *  @description Преобразоваение дааных из CSV файла в двумерный массив
 */
function CSVtoArray() {
    var text = loadFile(distributionPath);
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) {
                row[i] += l;
            }
            s = !s;
        } else if (separator === l && s) {
            l = row[++i] = '';
        } else if ('\n' === l && s) {
            if ('\r' === p) {
                row[i] = row[i].slice(0, -1);
            }
            row = ret[++r] = [l = ''];
            i = 0;
        } else {
            row[i] += l;
        }
        p = l;
    }
    return ret;
}

/**
 *  @description Чтение CSV файла
 */
function loadFile(fileName) {
	var fileDescriptor = imns.FIO.openNode(fileName);
	return imns.FIO.readTextFile(fileDescriptor);
}

/** 
 *  @description Преобразование двумерного массив к формату CSV файла
 */
function arrayToCSV(twoDiArray) {
    var csvRows = [];
    for (let i = 0; i < twoDiArray.length; i++) {
        var tempArray = [ ];
        for (let j = 0; j < twoDiArray[i].length; j++) {
            if (j === 1) {
                tempArray[j] = '\"' + twoDiArray[i][j] + '\"';
            } else {
                tempArray[j] = twoDiArray[i][j];
            }
        }
        csvRows.push(tempArray.join(';'));
    }
    return csvRows.join('\n');
}

/**
 *  @description Перезапись CSV файла
 */
function writeFile() {
    var fileDescriptor = imns.FIO.openNode(distributionPath);
    imns.FIO.writeTextFile(fileDescriptor, arrayToCSV(tasks));
}

/**
 *  @description Генерация случайного целочисленного значения между min и max
 */
function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const n = '\n';
while(true) {
    var tasks = CSVtoArray(separator);

    // Поиск нового задания / завершение рассылки, если все строчки обработаны...
    var newTaskIndex = null;
    for (let i = 1; i < tasks.length; i++) {
        if (tasks[i][2] === '') {
            iimDisplay('Новое задание для рассылки успешно найдено!');
            newTaskIndex = i;
            break;
        }
    }
    if (newTaskIndex === null) {
        alert('Завершение рассылки. Все сообщения успешно разосланы.');
        break;
    }

    // Поиск контакта в записной книжке кому отправить. Если контакт не найден - фиксация факта обработки строчки.
    iimPlayCode('SET !ERRORIGNORE YES'
            +n+ 'SET !TIMEOUT_PAGE 60'
            +n+ 'SET !TIMEOUT_STEP 10'
            +n+ 'TAB CLOSEALLOTHERS'
            +n+ 'TAB CLOSE'
            +n+ 'URL GOTO=https://web.whatsapp.com/'
            +n+ 'TAG POS=1 TYPE=INPUT:TEXT ATTR=* CONTENT=' + tasks[newTaskIndex][0]
            +n+ 'WAIT SECONDS=10');

    var elements = window.content.document.getElementsByTagName('span');
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerText === 'Чаты, контакты и сообщения не найдены') {
            iimDisplay('Сообщение не отправлено, так как нужный контакт или чат не был найден!');
            tasks[newTaskIndex][2] = 'Сообщение не отправлено, так как нужный контакт или чат не был найден!';
            break;
        } else if (elements[i].innerText.toLowerCase().includes(tasks[newTaskIndex][0].toLowerCase())) {
            iimPlayCode('SET !ERRORIGNORE YES'
                    +n+ 'SET !TIMEOUT_PAGE 60'
                    +n+ 'SET !TIMEOUT_STEP 10'
                    +n+ 'EVENT TYPE=MOUSEDOWN SELECTOR="#pane-side>DIV>DIV>DIV>DIV>DIV>DIV>DIV:nth-of-type(2)" BUTTON=0');
            
            for (let j = 0; j < tasks[newTaskIndex][1].length; j++) {
                if (j === 0) {
                    iimPlayCode('SET !ERRORIGNORE YES'
                            +n+ 'SET !TIMEOUT_STEP 10'
                            +n+ ' EVENT TYPE=CLICK SELECTOR="#main>FOOTER>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)" BUTTON=0');
                }

                if (tasks[newTaskIndex][1].charAt(j) === '\n') {
                    iimPlayCode('SET !ERRORIGNORE YES'
                        +n+ 'SET !TIMEOUT_STEP 10'
                        +n+ 'EVENT TYPE=KEYPRESS SELECTOR="#main>FOOTER>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)" KEY=13 MODIFIERS="shift"');
                } else {
                    iimPlayCode('SET !ERRORIGNORE YES'
                            +n+ 'SET !TIMEOUT_STEP 10'
                            +n+ 'EVENT TYPE=KEYPRESS SELECTOR="#main>FOOTER>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)" CHAR=\"' + tasks[newTaskIndex][1].charAt(j) + '\"');
                }
            }
            // Отправка сообщения...
            iimPlayCode('SET !ERRORIGNORE YES'
                    +n+ 'SET !TIMEOUT_STEP 10'
                    +n+ 'EVENT TYPE=CLICK SELECTOR="#main>FOOTER>DIV>BUTTON" BUTTON=0');
                    
            let randomDelay = getRandomInt(120, 520);
            iimDisplay('Сообщение отправлено!\r\nОжидание ' + randomDelay + ' секунд...');
            tasks[newTaskIndex][2] = 'Отправлено!';
            iimPlayCode('WAIT SECONDS=' + randomDelay);
            break;
        }
    }
    writeFile(tasks);   // Перезапись CSV файла
    continue;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------