import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneMask]',
  host: {ngSkipHydration: 'true'},
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Проверяем, является ли значение пустым
    if (!value) {
      // Если значение пустое, удаляем символ "+" и выходим из функции
      this.el.nativeElement.value = '';
      return;
    }

    // Удаляем все символы, кроме цифр
    const cleanedValue = value.replace(/\D/g, '');

    // Применяем маску к номеру телефона
    let formattedValue = '';
    let index = 0;
    const mask = '+(___) __-___-__-__';

    for (let i = 0; i < mask.length; i++) {
      if (mask.charAt(i) === '_') {
        if (index < cleanedValue.length) {
          formattedValue += cleanedValue.charAt(index++);
        } else {
          break;
        }
      } else {
        formattedValue += mask.charAt(i);
      }
    }

    // Получаем последний символ отформатированной строки
    const lastChar = formattedValue.charAt(formattedValue.length - 1);

    // Проверяем, является ли последний символ одним из символов `(`, `)`, `-`
    if (lastChar === '(' || lastChar === ')' || lastChar === '-') {
      // Удаляем последний символ
      formattedValue = formattedValue.slice(0, -1);
    }
    if (lastChar === ' ') {
      formattedValue = formattedValue.slice(0, -2);
    }
    // Устанавливаем отформатированное значение в поле ввода
    this.el.nativeElement.value = formattedValue;
  }
}