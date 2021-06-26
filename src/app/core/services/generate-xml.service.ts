import { Injectable } from '@angular/core';
import * as js2xmlparser from 'js2xmlparser';

@Injectable()
export class GenerateXmlService {

  public jsonToXml(nameForXml: string, json: any) {
    return js2xmlparser.parse(nameForXml, json);
  }

}