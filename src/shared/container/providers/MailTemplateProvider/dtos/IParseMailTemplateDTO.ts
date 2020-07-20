interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  fileLocation: string;
  variables: ITemplateVariables;
}
