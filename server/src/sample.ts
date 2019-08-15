export class Sample {
    private secondModel: SecondTypeModel = {};

    public getFirstModel(): FirstModel {
        const model: FirstModel = {};

        model.property = this.getPropertyValue();

        return model;
    }

    public getPropertyValue(): string {
        let propertyValue: string;

        propertyValue = this.getDefaultPropertyValue();

        return propertyValue;
    }

    private getDefaultPropertyValue(): string {
        const defaultPropertyValue: string = 'Default';

        return defaultPropertyValue;
    }
}

// import { stringLiteral } from '@babel/types';
// import { UserRole } from 'src/enums';

// 'models' folder.
// 'model' is our abstraction level.

// 'First' is our type name.
// File will be named 'type.model.ts'.
export interface FirstModel {
    property?: string;
    secondProperty?: PropertyType;
}

// 'SecondType' is our type name.
// File will be named 'second-type.model.ts'.
export interface SecondTypeModel {
    property?: string;
}

enum PropertyType {
    NONE = 0,
    First = 1,
    Second = 2
}

// class FirstClass {
//     public isUseDefaultValue: boolean = true;
//     public isOperationCompleted: boolean;

//     private readonly propertyValue: string = 'PrOpErTy';
//     private readonly secondPropertyValue: PropertyType.NONE;

//     public getFirstModel(propertyName: string, secondProperty: PropertyType): FirstModel {
//         const firstModel: FirstModel = {};

//         if (this.isUseDefaultValue) {
//             firstModel.property = this.propertyValue;
//             firstModel.secondProperty = this.secondPropertyValue;

//             this.isOperationCompleted = true;

//             return firstModel;
//         }

//         firstModel.property = propertyName;
//         firstModel.secondProperty = secondProperty;

//         this.isOperationCompleted = true;

//         return firstModel;
//     }
// }
