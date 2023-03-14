import { CarBodyTypeEnum } from "../enums/CarBodyType.enum";

export interface ICar {
    id: string;
    modelName: string;
    bodyType: CarBodyTypeEnum;
    modelType: string;
    imageUrl: string;
}
