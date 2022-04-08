import { makeAutoObservable } from 'mobx';
import { Languages } from '../common/languages/language';
import { CZValues } from '../common/languages/languageValuesCZ';
import { ENValues } from '../common/languages/languageValuesEN';

export default class LanguageStore
{ 
     language: Languages = Languages.CZ;
     languageValues = CZValues;
     constructor() {
          makeAutoObservable(this);
     }

     changeLanguage = (language: Languages) => {
          this.language = language;
          switch (language) {
               case Languages.CZ:
                    this.languageValues = CZValues;
                    break;
               case Languages.EN:
                    this.languageValues = ENValues;
                    break;
          }
     }
}