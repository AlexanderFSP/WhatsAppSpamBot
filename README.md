## :mag_right:Description ##
`WhatsAppSpamBot` - это бот для рассылки сообщений в WhatsApp через [Web-версию](https://web.whatsapp.com/) на основе расширения для Mozilla Firefox - [iMacros версии 8.9.7](https://addons.mozilla.org/ru/firefox/addon/imacros-for-firefox/).
## :computer:Demo (YouTube) ##
[![Video demonstration about bot working on YouTube](https://lh3.googleusercontent.com/ssMSrahkH_6xSslRADeYaREbkujj6eq_WYg62bquyRLPrkpvFCGANUHSyynhSWKm-nT_zzWtbSSzUdzauJW1MTQ_SqZvDBdwlS3JraX_xV5oj5_HUVCpoQd4G4TX6y5P5BK-gb7ckjX28DgFFSykSTWWQEzgBxUFccIGEDTwaTmMLzq0WRaJagcCGpeak-ZRh6EcuTWM0klVMq1UvY4Yj0S5oBcdU43IBEC05IP5p9wWd7-AG6uiLMOMaAdRkel6hvlduZiskQzTKASNFHFeUGQTloxxeYomrAXlaPigwLAevNNYZREyciarfpWZ30Oje2zrY_7VxoBIyVZ18T51gtDW-4MQFQKisIvhwMGUD8uumWx0XpYfolHF2fOBFxBFiIoW0e2C9NdkiBHHRpJ8G5Y5SnVnt-aXNg8nPs842ENSKqPi7JFqH7aN9vvVW9lOz5y3WNq-IPO1nUpbDbdcLupjvhnfH-OkmRsBeYDGV7DuUiigwElAydU4jNmSxbYZVBg-PX4Y9aXe280CcG-HFEgY-nKOPxhwo-LTAQgk9nwiAnXXhstwApS905Ax_Jweg-2C9x3p5o5F0Pic6oZ9fP4i_9u3U2_l0Zs2Zno=w1920-h1080-no)](https://www.youtube.com/watch?v=hJpWjh9CQEY)
## :scroll:Install ##
Чтение исходных задач / запись результатов осуществляется через CSV файл, до которого в файле скриптом необходимо указать путь. А также необходимо задать символ, который является разделителем значений колонок.
```javascript
const distributionPath = '/Users/mymac/Desktop/Рассылка.csv';
const separator = ';';   // or ','
```
***
**Пример структуры CSV файла:**

Всего может быть 3 типа статусов:
1. "Отправлено!";
2. "Сообщение не отправлено, так как нужный контакт или чат не был найден!";
3. Пустая ячейка означает, что сообщение необходимо отправить при последующем запуске бота.

![CSV файл](https://lh3.googleusercontent.com/hWVs347AfCKBLrPhi_G3V85eoPYwEY4CIiUSVR1RW6-Ahzc5DdfqJiaIg_RljSWDHynCk9Ht6ztn8KYNyfR42myq9WnN7fDtNEBcUfhRsCuGocXsMBjN7xeApq3XwL-fip64vC1fGyIOmZZ5aVJlS8Id90f6gBNJlNt0yo7i3GT2Fu_glflD8QV5gMS362soCqKDsHhECejMr9MjoxhPMzsZD2MeMPFNRHYRflBeezG5ETVFhnJsbig8A6daaDXWNXXwzqXbMltTcQUYB5ZYj2kP0AQ1oXMkrTD0HbRh87n8DrM0XzOmYF8RFoucYZXNJ5YVGDUIdymHFTP0p-IftaJVK-uPCRUlRVpnDh0cotu4277KChIxHzpWSn05gFaJ6uMuHBRdrwkB12MyqNugn6ZQKxxt27u60I8eubwJhLCFF2Q2v6GEA33RmQT96uU0_vtGDBc35il-whODjpD88eQBgOnBUNHxqCg-Tvb7IN5Zh49_t5xipbP5t41aaQwQG9mxqXgTvB_A44GwkNCoBFmz1VNL7LeTiRtBA06y6eAdBvrx3jzqn3uMU7zVIkPJQmdE3V2everBPtP3n1dJd23qfFcX5bScvmMtUGA=w1148-h878-no)
