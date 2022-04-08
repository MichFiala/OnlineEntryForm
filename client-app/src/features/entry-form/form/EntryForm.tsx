import { useState } from "react";
import { Form } from "formik";
import { Button, Icon, Label, Segment } from "semantic-ui-react";
import { Form as SemanticUIForm } from 'semantic-ui-react';
import ErrorAbleDateInput from "../../../common/form/ErrorAbleDateInput";
import ErrorAbleTextInput from "../../../common/form/ErrorAbleTextInput";
import { FormValues } from "../../../common/form/models/form";
import * as Yup from 'yup';
import { Formik } from "formik";
import { Gender } from "../../../common/form/models/gender";
import { Nationality } from "../../../common/form/models/nationality";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { Languages } from "../../../common/languages/language";
import agent from "../../../api/agent";

export default observer(function ContactForm() {
     const { languageStore } = useStore();
     const { languageValues, changeLanguage } = languageStore;
     const [formFinished, setFormFinished] = useState(false);
     const [contactFormValues] = useState(new FormValues());
     const [pidRequired, setPidRequired] = useState(true);
     const pidRegex = /[0-9]{2,6}-?[0-9]{2,10}\/?[0-9]{4}/;
     const pidFieldName = 'personalIdentificationNumber';

     const validationSchema = Yup.object({
          firstName: Yup.string().required(languageValues.firstNameRequired),
          lastName: Yup.string().required(languageValues.lastNameRequired),
          personalIdentificationNumber:
               pidRequired ?
                    Yup.string().required(languageValues.personalIdentificationNumberRequired).matches(pidRegex, languageValues.invalidPidFormat) : Yup.string(),
          birthDate: Yup.date().required(languageValues.birthDateRequired),
          gender: Yup.number().required(),
          nationality: Yup.number().required(),
          agreementGDPR: Yup.boolean().isTrue(),
          email: Yup.string().required(languageValues.emailRequired).email(),
     });

     function handleFormSubmit(values: FormValues) {
          agent.Form.send(values);

          setFormFinished(true);
     }

     function formOnChange(event: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) {
          // We need to capture only pid field change
          if (event.nativeEvent.target?.name !== pidFieldName) return;

          var rawData = event.nativeEvent.target?.value;
          var data = rawData.toString();
          // If dont match we dont proceed
          if (!pidRegex.test(data)) return;
          // Extract year, month and day
          const year = (data.toString()).substring(0, 2);
          let month = (data.toString()).substring(2, 4);
          const day = (data.toString()).substring(4, 6);
          // For girls substract 50 and set gender
          if (Number(month) - 50 > 0) {
               month -= 50;
               setFieldValue('gender', Gender.Female);
          }
          try {
               
               // Need to check year cause of 00 -> 1900
               const date = new Date(year, month - 1, day);
               if (date.getFullYear() < 1970) {
                    date.setFullYear(date.getFullYear() + 100);
               }
               setFieldValue('birthDate', date);
          }
          catch(ex) {}
     }
     if (formFinished) 
          return <Segment basic>
               <Label>{languageValues.finishMessage}</Label>
          </Segment>

     return (
          <Segment basic>
               <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={contactFormValues}
                    onSubmit={values => handleFormSubmit(values)}
               >
                    {({ handleSubmit, isValid, isSubmitting, dirty, setFieldError, setFieldValue, values }) => (
                         <Form
                              className='ui form'
                              onSubmit={handleSubmit}
                              autoComplete='off'
                              onChange={(e) => formOnChange(e, setFieldValue)}>
                              <SemanticUIForm.Group widths={1}>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={languageValues.czech}
                                             name='nationality'
                                             value={Nationality.Czech}
                                             onChange={() => {
                                                  setFieldValue('nationality', Nationality.Czech);
                                                  changeLanguage(Languages.CZ)
                                             }}
                                             checked={values.nationality === Nationality.Czech}
                                        />
                                   </SemanticUIForm.Field>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={languageValues.english}
                                             name='nationality'
                                             value={Nationality.English}
                                             onChange={() => {
                                                  setFieldValue('nationality', Nationality.English);
                                                  changeLanguage(Languages.EN)
                                             }}
                                             checked={values.nationality === Nationality.English}
                                        />
                                   </SemanticUIForm.Field>
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group widths={'equal'}>
                                   <ErrorAbleTextInput
                                        name='firstName'
                                        placeholder={languageValues.firstNamePlaceholder} />
                                   <ErrorAbleTextInput
                                        name='lastName'
                                        placeholder={languageValues.lastNamePlaceholder} />
                                   <SemanticUIForm.Checkbox
                                        label={languageValues.dontHavePID}
                                        name="pidRequired"
                                        defaultChecked={!pidRequired}
                                        onChange={() => { setPidRequired(!pidRequired); setFieldError("personalIdentificationNumber", undefined) }}
                                   />
                                   <ErrorAbleTextInput
                                        name={pidFieldName}
                                        placeholder={languageValues.personalIdentificationNumberPlaceholder} />
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group widths={'equal'}>
                                   <ErrorAbleDateInput
                                        name='birthDate'
                                        placeholderText={languageValues.birthDatePlaceholder}
                                        dateFormat='yyyy-MM-dd'
                                   />
                                   <ErrorAbleTextInput
                                        name='email'
                                        placeholder={languageValues.emailPlaceholder} />
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group widths={1}>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={languageValues.male}
                                             name='gender'
                                             value={Gender.Male}
                                             onChange={() => setFieldValue('gender', Gender.Male)}
                                             checked={values.gender === Gender.Male}
                                        />
                                   </SemanticUIForm.Field>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={languageValues.female}
                                             name='gender'
                                             value={Gender.Female}
                                             onChange={() => setFieldValue('gender', Gender.Female)}
                                             checked={values.gender === Gender.Female}
                                        />
                                   </SemanticUIForm.Field>
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group>
                                   <SemanticUIForm.Checkbox
                                        name='agreementGDPR'
                                        label={languageValues.agreementGDPR}
                                        onChange={() => setFieldValue('agreementGDPR', !values.agreementGDPR)}>
                                   </SemanticUIForm.Checkbox>
                                   <a href='https://euc.cz/clanky-a-novinky/clanky/gdpr/' target='_blank'>
                                        <Icon name='file pdf' />
                                   </a>
                              </SemanticUIForm.Group>
                              <Button
                                   disabled={isSubmitting || !dirty || !isValid}
                                   loading={isSubmitting}
                                   fluid
                                   color='google plus'
                                   content={languageValues.submitButton}
                                   type='submit'
                                   size='large'
                              />
                         </Form>
                    )}
               </Formik>
          </Segment >
     )
});
