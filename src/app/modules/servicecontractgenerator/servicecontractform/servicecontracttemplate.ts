import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun,
    UnderlineType
  } from "docx";
import { ClientRequest } from "http";
import { type } from "os";
import { single } from "rxjs/operators";

  export class DocumentCreator{
    
      public create(): Document {
        
        const document = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "SERVICE CONTRACT",
                                    bold: true,
                                    underline: {
                                        type: UnderlineType.SINGLE,
                                    },
                                    size: 24,
                                    
                                }),
                                
                            ],
                            alignment: AlignmentType.CENTER,
                            
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "\tTHIS SERVICE CONTRACT ",
                                    bold: true,
                                    size: 24,
                                }),
                                new TextRun({
                                    text: "(this “Contract”) is made and executed as of the Execution Date (as defined below) by and between Owner (as defined below), and Contractor (as defined below).",
                                    size: 24,
                                })
                            ],
                        }),
                    ]
                }
            ]
        });
        return document;
      }
  }