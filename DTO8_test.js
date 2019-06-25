function AddLeft(str, add, len)
{
  // Потому что в JScript нет функций форматированного вывода
  str = String(str);
  while (str.length < len)
    str = add + str;
  return str;
}

function dump(Text)
{
  var DumpFolder = "C:\\DUMPS\\";
  var now = new Date();
  var DumpFile = now.getYear() + '_' + AddLeft(now.getMonth() + 1, '0', 2) + '_' + AddLeft(now.getDate(), '0', 2) + '_' + AddLeft(now.getHours(), '0', 2) + '_' + AddLeft(now.getMinutes(), '0', 2) + '_' + AddLeft(now.getSeconds(), '0', 2) + '_' + AddLeft(now.getMilliseconds(), '0',3) + ".txt";
  fso = new ActiveXObject("Scripting.FileSystemObject");
  if (!fso.FolderExists(DumpFolder))
    fso.CreateFolder(DumpFolder);
  ts = fso.OpenTextFile(DumpFolder + DumpFile, 8, true);
  ts.WriteLine(Text);  
  ts.Close();
}

// Примеры работы с моделью АТОЛ 77Ф

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// --------------------------- Подключение к устройству -----------------------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

var driver = new ActiveXObject ("AddIn.FPrnM8");
driver.AddDevice();
driver.Model = 69;
driver.UseAccessPassword = 1;
driver.DefaultPassword = 30;
driver.PortNumber = 1008;
driver.BaudRate = 18;
driver.ShowProperties()
driver.DeviceEnabled = 1;


// СНО - 1, ЕНВД - 8, ПСН - 32 
driver.Mode = 0;
driver.SetMode();
driver.AttrNumber = 1062;
driver.ReadAttribute();
dump(driver.AttrValue);

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ---------------------------------- Открыть смену ------------------------------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

driver.Mode = 1;
driver.SetMode();
driver.NewDocument();
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();
driver.OpenSession();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ---------- Чек прихода без отправки электронного чека покупателю ---------- //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Mode - Режим:
// 	0 - Выбора
// 	1 - Регистрации
// 	2 - Отчётов без гашения
// 	3 - Отчётов с гашением
driver.Mode = 1;
driver.SetMode();

driver.NewDocument();

// Записать должность и ФИО кассира
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();

// CheckType - Тип чека:
// 	1 - Приход
// 	2 - Возврат прихода
// 	4 - Расход
// 	5 - Возврат расхода
// 	7 - Коррекция прихода
// 	9 - Коррекция расхода
driver.CheckType = 1;
// CheckMode - Режим формирования чека:
// 	0 - только в электронном виде без печати на чековой ленте
// 	1 - печатать на чековой ленте
driver.CheckMode = 1;
driver.OpenCheck();

driver.AttrNumber = 1055;
// Применяемая система налогооблажения в чеке:
// 	ОСН - 1
// 	УСН доход - 2
// 	УСН доход-расход - 4
// 	ЕНВД - 8
// 	ЕСН - 16
// 	ПСН - 32
driver.AttrValue = 8;
driver.WriteAttribute();

// Регистрация товара или услуги
driver.Name = "Молоко 3.2%";
driver.Price = 50.33;
driver.Quantity = 2;
driver.Department = 0;
// TaxTypeNumber - Номер налога:
// 	0 - Налог из секции
// 	1 - НДС 0%
// 	2 - НДС 10%
// 	3 - НДС 18%
// 	4 - НДС не облагается
// 	5 - НДС с расчётной ставкой 10%
// 	6 - НДС с расчётной ставкой 18%
driver.TaxTypeNumber = 4;
// рекомендуется рассчитывать в кассовом ПО цену со скидкой, а информацию по начисленным скидкам печатать нефискальной печатью и не передавать скидку в ККМ, поэтому код для начисления скидки закомментирован
// driver.DiscountValue = 10;
// // DiscountType - Тип скидки:
// // 	0 - суммовая
// // 	1 - процентная
// driver.DiscountType = 0;
driver.Registration();
driver.Caption = "В том числе скидка: 4.67\nЦена без скидки: 55.00";
driver.PrintString();

// Отброс копеек (округление чека без распределения по позициям). Скидка на чек доступна только для его округления до рубля. Таким образом недоступны: надбавки, назначение "на позицию", процентные значения.  SummCharge(), PercentsCharge(), PercentsDiscount () и ResetChargeDiscount () более недоступны
// Destination - Назначение скидки:
// 	0 - на чек
// 	1 - на позицию (недоступно)
driver.Destination = 0;
driver.Summ = 0.66;
driver.SummDiscount();

// Нефискальная печать с информацией по скидкам чека
driver.Caption = "--Скидки по чеку--";
driver.PrintString();
driver.Caption = "Сумма чека без скидок 110.00";
driver.PrintString();
driver.Caption = "Скидки по карте: 9.34";
driver.PrintString();
driver.Caption = "Округление: 0.66";
driver.PrintString();

// Оплата и закрытие чека
// TypeClose - Тип оплаты:
// 	0 - Наличными
// 	1 - Электронными средствами платежа
driver.TypeClose = 0;
driver.Summ = 500.00;
driver.Payment();
driver.CloseCheck();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ----- Чек возврата прихода без отправки электронного чека покупателю ---- //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Mode - Режим:
// 	0 - Выбора
// 	1 - Регистрации
// 	2 - Отчётов без гашения
// 	3 - Отчётов с гашением
driver.Mode = 1;
driver.SetMode();

driver.NewDocument();

// Записать должность и ФИО кассира
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();

// CheckType - Тип чека:
// 	1 - Приход
// 	2 - Возврат прихода
// 	4 - Расход
// 	5 - Возврат расхода
// 	7 - Коррекция прихода
// 	9 - Коррекция расхода
driver.CheckType = 2;
// CheckMode - Режим формирования чека:
// 	0 - только в электронном виде без печати на чековой ленте
// 	1 - печатать на чековой ленте
driver.CheckMode = 1;
driver.OpenCheck();

driver.AttrNumber = 1055;
// Применяемая система налогооблажения в чеке:
// 	ОСН - 1
// 	УСН доход - 2
// 	УСН доход-расход - 4
// 	ЕНВД - 8
// 	ЕСН - 16
// 	ПСН - 32
driver.AttrValue = 8;
driver.WriteAttribute();

// Регистрация товара или услуги
driver.Name = "Молоко 3.2%";
driver.Price = 50.33;
driver.Quantity = 2;
driver.Department = 0;
// TaxTypeNumber - Номер налога:
// 	0 - Налог из секции
// 	1 - НДС 0%
// 	2 - НДС 10%
// 	3 - НДС 18%
// 	4 - НДС не облагается
// 	5 - НДС с расчётной ставкой 10%
// 	6 - НДС с расчётной ставкой 18%
driver.TaxTypeNumber = 4;
// рекомендуется рассчитывать в кассовом ПО цену со скидкой, а информацию по начисленным скидкам печатать нефискальной печатью и не передавать скидку в ККМ, поэтому код для начисления скидки закомментирован
// driver.DiscountValue = 10;
// // DiscountType - Тип скидки:
// // 	0 - суммовая
// // 	1 - процентная
// driver.DiscountType = 0;
driver.Registration();
driver.Caption = "В том числе скидка: 4.67\nЦена без скидки: 55.00";
driver.PrintString();

// Отброс копеек (округление чека без распределения по позициям). Скидка на чек доступна только для его округления до рубля. Таким образом недоступны: надбавки, назначение "на позицию", процентные значения.  SummCharge(), PercentsCharge(), PercentsDiscount () и ResetChargeDiscount () более недоступны
// Destination - Назначение скидки:
// 	0 - на чек
// 	1 - на позицию (недоступно)
driver.Destination = 0;
driver.Summ = 0.66;
driver.SummDiscount();

// Нефискальная печать с информацией по скидкам чека
driver.Caption = "--Скидки по чеку--";
driver.PrintString();
driver.Caption = "Сумма чека без скидок 110.00";
driver.PrintString();
driver.Caption = "Скидки по карте: 9.34";
driver.PrintString();
driver.Caption = "Округление: 0.66";
driver.PrintString();

// Оплата и закрытие чека
// TypeClose - Тип оплаты:
// 	0 - Наличными
// 	1 - Электронными средствами платежа
driver.TypeClose = 0;
driver.Summ = 100.00;
driver.Payment();
driver.CloseCheck();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ---------- Чек прихода с отправкой электронного чека покупателю ---------- //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// Mode - Режим:
// 	0 - Выбора
// 	1 - Регистрации
// 	2 - Отчётов без гашения
// 	3 - Отчётов с гашением
driver.Mode = 1;
driver.SetMode();

driver.NewDocument();

// Записать должность и ФИО кассира
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();

// CheckType - Тип чека:
// 	1 - Приход
// 	2 - Возврат прихода
// 	4 - Расход
// 	5 - Возврат расхода
// 	7 - Коррекция прихода
// 	9 - Коррекция расхода
driver.CheckType = 1;
// CheckMode - Режим формирования чека:
// 	0 - только в электронном виде без печати на чековой ленте
// 	1 - печатать на чековой ленте
driver.CheckMode = 1;
driver.OpenCheck();

driver.AttrNumber = 1055;
// Применяемая система налогооблажения в чеке:
// 	ОСН - 1
// 	УСН доход - 2
// 	УСН доход-расход - 4
// 	ЕНВД - 8
// 	ЕСН - 16
// 	ПСН - 32
driver.AttrValue = 1;
driver.WriteAttribute();

// Запись контакта покупателя для отправки электронного чека
driver.AttrNumber = 1008;
driver.AttrValue = "+79091235566";
driver.WriteAttribute();

// Регистрация товара или услуги
driver.Name = "Детсткое питание Тёма";
driver.Price = 47.70;
driver.Quantity = 6;
driver.Department = 0;
// driver.DiscountType = 0;
// TaxTypeNumber - Номер налога:
// 	0 - Налог из секции
// 	1 - НДС 0%
// 	2 - НДС 10%
// 	3 - НДС 18%
// 	4 - НДС не облагается
// 	5 - НДС с расчётной ставкой 10%
// 	6 - НДС с расчётной ставкой 18%
driver.TaxTypeNumber = 4;
// рекомендуется рассчитывать в кассовом ПО цену со скидкой, а информацию по начисленным скидкам печатать нефискальной печатью и не передавать скидку в ККМ, поэтому код для начисления скидки закомментирован
// driver.DiscountValue = 10;
// // DiscountType - Тип скидки:
// // 	0 - суммовая
// // 	1 - процентная
driver.Registration();

driver.Caption = "В том числе скидка 10%: 5.30 \nЦена без скидки: 53.00";
driver.PrintString();

driver.Name = "Коньяк Победа 0,5";
driver.Price = 813.50;
driver.Quantity = 1;
driver.Department = 0;
// TaxTypeNumber - Номер налога:
// 	0 - Налог из секции
// 	1 - НДС 0%
// 	2 - НДС 10%
// 	3 - НДС 18%
// 	4 - НДС не облагается
// 	5 - НДС с расчётной ставкой 10%
// 	6 - НДС с расчётной ставкой 18%
driver.TaxTypeNumber = 3;
// рекомендуется рассчитывать в кассовом ПО цену со скидкой, а информацию по начисленным скидкам печатать нефискальной печатью и не передавать скидку в ККМ, поэтому код для начисления скидки закомментирован
// driver.DiscountValue = 10;
// // DiscountType - Тип скидки:
// // 	0 - суммовая
// // 	1 - процентная
// driver.DiscountType = 0;
driver.Registration();

// Отброс копеек (округление чека без распределения по позициям). Скидка на чек доступна только для его округления до рубля. Таким образом недоступны: надбавки, назначение "на позицию", процентные значения.  SummCharge(), PercentsCharge(), PercentsDiscount () и ResetChargeDiscount () более недоступны
// Destination - Назначение скидки:
// 	0 - на чек
// 	1 - на позицию (недоступно)
driver.Destination = 0;
driver.Summ = 0.70;
driver.SummDiscount();

// Нефискальная печать с информацией по скидкам чека
driver.Caption = "--Скидки по чеку--";
driver.PrintString();
driver.Caption = "Сумма чека без скидок 1131.50";
driver.PrintString();
driver.Caption = "Скидки по карте: 31.80";
driver.PrintString();
driver.Caption = "Округление: 0.70";
driver.PrintString();

// TypeClose - Тип оплаты:
// 	0 - Наличными
// 	1 - Электронными средствами платежа
driver.TypeClose = 0;
driver.Summ = 1500.00;
driver.Payment();
driver.CloseCheck();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ---------- Чек прихода с отправкой электронного чека покупателю -----------//
// ---------------------------- без печати на чековой ленте ---------------------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// Mode - Режим:
// 	0 - Выбора
// 	1 - Регистрации
// 	2 - Отчётов без гашения
// 	3 - Отчётов с гашением
driver.Mode = 1;
driver.SetMode();

driver.NewDocument();

// Записать должность и ФИО кассира
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();

// CheckType - Тип чека:
// 	1 - Приход
// 	2 - Возврат прихода
// 	4 - Расход
// 	5 - Возврат расхода
// 	7 - Коррекция прихода
// 	9 - Коррекция расхода
driver.CheckType = 1;
// CheckMode - Режим формирования чека:
// 	0 - только в электронном виде без печати на чековой ленте
// 	1 - печатать на чековой ленте
driver.CheckMode = 0;
driver.OpenCheck();

driver.AttrNumber = 1055;
// Применяемая система налогооблажения в чеке:
// 	ОСН - 1
// 	УСН доход - 2
// 	УСН доход-расход - 4
// 	ЕНВД - 8
// 	ЕСН - 16
// 	ПСН - 32
driver.AttrValue = 1;
driver.WriteAttribute();

// Запись контакта покупателя для отправки электронного чека
driver.AttrNumber = 1008;
driver.AttrValue = "+79091235566";
driver.WriteAttribute();

// Регистрация товара или услуги
driver.Name = "Детсткое питание Тёма";
driver.Price = 47.70;
driver.Quantity = 6;
driver.Department = 0;
// driver.DiscountType = 0;
// TaxTypeNumber - Номер налога:
// 	0 - Налог из секции
// 	1 - НДС 0%
// 	2 - НДС 10%
// 	3 - НДС 18%
// 	4 - НДС не облагается
// 	5 - НДС с расчётной ставкой 10%
// 	6 - НДС с расчётной ставкой 18%
driver.TaxTypeNumber = 4;
// рекомендуется рассчитывать в кассовом ПО цену со скидкой, а информацию по начисленным скидкам печатать нефискальной печатью и не передавать скидку в ККМ, поэтому код для начисления скидки закомментирован
// driver.DiscountValue = 10;
// // DiscountType - Тип скидки:
// // 	0 - суммовая
// // 	1 - процентная
driver.Registration();

driver.Caption = "В том числе скидка 10%: 5.30 \nЦена без скидки: 53.00";
driver.PrintString();

driver.Name = "Коньяк Победа 0,5";
driver.Price = 813.50;
driver.Quantity = 1;
driver.Department = 0;
// TaxTypeNumber - Номер налога:
// 	0 - Налог из секции
// 	1 - НДС 0%
// 	2 - НДС 10%
// 	3 - НДС 18%
// 	4 - НДС не облагается
// 	5 - НДС с расчётной ставкой 10%
// 	6 - НДС с расчётной ставкой 18%
driver.TaxTypeNumber = 3;
// рекомендуется рассчитывать в кассовом ПО цену со скидкой, а информацию по начисленным скидкам печатать нефискальной печатью и не передавать скидку в ККМ, поэтому код для начисления скидки закомментирован
// driver.DiscountValue = 10;
// // DiscountType - Тип скидки:
// // 	0 - суммовая
// // 	1 - процентная
// driver.DiscountType = 0;
driver.Registration();

// Отброс копеек (округление чека без распределения по позициям). Скидка на чек доступна только для его округления до рубля. Таким образом недоступны: надбавки, назначение "на позицию", процентные значения.  SummCharge(), PercentsCharge(), PercentsDiscount () и ResetChargeDiscount () более недоступны
// Destination - Назначение скидки:
// 	0 - на чек
// 	1 - на позицию (недоступно)
driver.Destination = 0;
driver.Summ = 0.70;
driver.SummDiscount();

// Нефискальная печать с информацией по скидкам чека
driver.Caption = "--Скидки по чеку--";
driver.PrintString();
driver.Caption = "Сумма чека без скидок 1131.50";
driver.PrintString();
driver.Caption = "Скидки по карте: 31.80";
driver.PrintString();
driver.Caption = "Округление: 0.70";
driver.PrintString();

// TypeClose - Тип оплаты:
// 	0 - Наличными
// 	1 - Электронными средствами платежа
driver.TypeClose = 0;
driver.Summ = 1500.00;
driver.Payment();
driver.CloseCheck();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ----------------------------- Чек коррекции прихода ------------------------------- //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// Mode - Режим:
// 	0 - Выбора
// 	1 - Регистрации
// 	2 - Отчётов без гашения
// 	3 - Отчётов с гашением
driver.Mode = 1;
driver.SetMode();

driver.NewDocument();

// Записать должность и ФИО кассира
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();

// CheckType - Тип чека:
// 	1 - Приход
// 	2 - Возврат прихода
// 	4 - Расход
// 	5 - Возврат расхода
// 	7 - Коррекция прихода
// 	9 - Коррекция расхода
driver.CheckType = 7;
// CheckMode - Режим формирования чека:
// 	0 - только в электронном виде без печати на чековой ленте
// 	1 - печатать на чековой ленте
driver.CheckMode = 1;
driver.OpenCheck();

// Регистрация суммы коррекции. В чеках коррекции можно зарегистрировать только одну позицию в количестве 1 на сумму коррекции. Передавать СНО,  скидки/надбавки, выполнять оплату запрещено. Чек коррекции можно только закрыть без сдачи по одному типу оплаты.
driver.Name = "Коррекция прихода";
driver.Price = 99.33;
driver.Quantity = 1;
driver.Department = 0;

// ??????????? Корректно ли передавать НДС???
// TaxTypeNumber - Номер налога:
// 	0 - Налог из секции
// 	1 - НДС 0%
// 	2 - НДС 10%
// 	3 - НДС 18%
// 	4 - НДС не облагается
// 	5 - НДС с расчётной ставкой 10%
// 	6 - НДС с расчётной ставкой 18%
driver.TaxTypeNumber = 4;
driver.Registration();
// Оплата и закрытие чека
// TypeClose - Тип оплаты:
// 	0 - Наличными
// 	1 - Электронными средствами платежа
driver.TypeClose = 0;
driver.Summ = 99.33;
driver.CloseCheck();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ---------------------------------- Закрыть смену -------------------------------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

driver.Mode = 3;
driver.SetMode();
driver.NewDocument();
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();
driver.ReportType = 1;
driver.Report();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ------------------------- Отчёт о состоянии расчётов ------------------------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

driver.Mode = 2;
driver.SetMode();
driver.NewDocument();
driver.AttrNumber = 1021;
driver.AttrValue = "Старший кассир Иванов И.И.";
driver.WriteAttribute();
driver.ReportType = 42;
driver.Report();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ----------- Получение состояния связи фискального накопителя --------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

var textForPrint = "";
driver.Mode = 0;
driver.SetMode();
// Код ошибки сети
driver.RegisterNumber = 43;
driver.OFDLastError = 1;
driver.GetRegister();
textForPrint += "Код ошибки сети: " + driver.OFDLastError + "\n";
//  Код ошибки ОФД
driver.RegisterNumber = 43;
driver.OFDLastError = 2;
driver.GetRegister();
textForPrint += "Код ошибки ОФД: " + driver.OFDLastError + "\n";
// Код ошибки ФН
driver.RegisterNumber = 43;
driver.OFDLastError = 3;
driver.GetRegister();
textForPrint += "Код ошибки ФН: " + driver.OFDLastError;
dump(textForPrint);
driver.Caption = textForPrint;
driver.PrintString();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ----------- Получение количества неотправленных документов и --------------//
//------------------- даты самого старого неотправленного -------------------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

var textForPrint = "";
driver.Mode = 0;
driver.SetMode();
// Количество неотправленных документов:
driver.RegisterNumber = 44;
driver.GetRegister();
textForPrint += "Количество неотправленных документов: " + driver.Count + "\n";
// Дата самого старого неотправленного документа
driver.RegisterNumber = 45;
driver.GetRegister();
textForPrint += "Дата самого старого неотправленного документа: " + driver.Day + "." + driver.Month + "." + driver.Year + " " + driver.Hour + ":" + driver.Minute;
dump(textForPrint);
driver.PrintString();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// ----------- Получение регистрационных данных ККТ ----------------------------//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
var textForPrint = "";
driver.Mode = 0;
driver.SetMode();

// Наименование пользователя
driver.AttrNumber = 1048;
driver.ReadAttribute();
textForPrint += "Наименование пользователя: " + driver.AttrValue + "\n";

// ИНН пользователя
driver.AttrNumber = 1018;
driver.ReadAttribute();
textForPrint += "ИНН пользователя: " + driver.AttrValue + "\n";

// Набор выбранных СНО в виде значения в десятичной системе исчисления, которое в двоичной соответствует битовой маске. Например 41 соответствует маске 101001 (ОСН 1, УСН доход 0, УСН доход-расход 0, ЕНВД 1, ЕСН 0, ПСН 1)
driver.AttrNumber = 1062;
driver.ReadAttribute();
textForPrint += "Выбранные СНО: " + driver.AttrValue + "\n";

// Регистрационный номер ККТ
driver.AttrNumber = 1037;
driver.ReadAttribute();
textForPrint += "Регистрационный номер ККТ: " + driver.AttrValue + "\n";
// аналогичным образом запрашиваются и остальные атрибуты

// Номер фискального накопителя
driver.RegisterNumber = 47;
driver.GetRegister();
textForPrint += "Номер фискального накопителя: " + driver.SerialNumber + "\n";

// Номер фискального документа последней регистрации/перерегистрации, а также дата и время
driver.RegisterNumber = 48;
driver.GetRegister();
textForPrint += "Номер ФД последней регистрации/перерегистрации: " + driver.DocNumber + "\n";
textForPrint += "Дата ФД последней регистрации/перерегистрации: " + driver.Day + "." + driver.Month + "." + driver.Year + " " + driver.Hour + ":" + driver.Minute + "\n";

// Данные по последнему фискальному документу чека
driver.RegisterNumber = 51;
driver.GetRegister();
textForPrint += "Номер фискального документа: " + driver.DocNumber + "\n";
textForPrint += "Тип чека: " + driver.LastCheckType + "\n";
textForPrint += "Сумма чека: " + driver.Summ + "\n";
textForPrint += "Дата и время чека: " + driver.Day + "." + driver.Month + "." + driver.Year + " " + driver.Hour + ":" + driver.Minute + "\n";
textForPrint += "Фискальный признак документа: " + driver.FiscalSign + "\n";

// Данные по последнему фискальному документу
driver.RegisterNumber = 52;
driver.GetRegister();
textForPrint += "Номер фискального документа: " + driver.DocNumber + "\n";
textForPrint += "Тип чека: " + driver.LastCheckType + "\n";
textForPrint += "Сумма чека: " + driver.Summ + "\n";
textForPrint += "Дата и время чека: " + driver.Day + "." + driver.Month + "." + driver.Year + " " + driver.Hour + ":" + driver.Minute + "\n";
textForPrint += "Фискальный признак документа: " + driver.FiscalSign + "\n";

dump(textForPrint);
// driver.Caption = textForPrint;
// driver.PrintString();
