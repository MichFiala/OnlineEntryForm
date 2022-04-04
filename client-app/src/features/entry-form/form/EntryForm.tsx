import { useState } from "react";
import { Form } from "formik";
import { Button, Icon, Segment } from "semantic-ui-react";
import { Form as SemanticUIForm } from 'semantic-ui-react';
import ErrorAbleDateInput from "../../../common/form/ErrorAbleDateInput";
import ErrorAbleTextInput from "../../../common/form/ErrorAbleTextInput";
import { FormValues } from "../../../common/form/models/form";
import * as Yup from 'yup';
import { Formik } from "formik";
import { Gender } from "../../../common/form/models/gender";
import { Nationality } from "../../../common/form/models/nationality";

export default function ContactForm() {
     const [contactFormValues] = useState(new FormValues());
     const [pidRequired, setPidRequired] = useState(true);
     const pidRegex = /[0-9]{2,6}-?[0-9]{2,10}\/?[0-9]{4}/;
     const pidFieldName = 'personalIdentificationNumber';

     const validationSchema = Yup.object({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          personalIdentificationNumber:
               pidRequired ?
                    Yup.string().required().matches(pidRegex) : Yup.string(),
          birthDate: Yup.date().required(),
          gender: Yup.number().required(),
          nationality: Yup.number().required(),
          agreementGDPR: Yup.boolean().isTrue(),
          email: Yup.string().required().email(),
     });

     function handleFormSubmit(values: FormValues) {
          console.log(values);
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
          const month = (data.toString()).substring(2, 4);
          const date = (data.toString()).substring(4, 6);

          setFieldValue('birthDate', new Date(year, month - 1, date));
     }
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
                              <SemanticUIForm.Group widths={'equal'}>
                                   <ErrorAbleTextInput
                                        name='firstName'
                                        placeholder={"firstName"} />
                                   <ErrorAbleTextInput
                                        name='lastName'
                                        placeholder={"lastName"} />
                                   <SemanticUIForm.Checkbox
                                        label='Dont have PersonalIdentificationNumber'
                                        name="pidRequired"
                                        defaultChecked={!pidRequired}
                                        onChange={() => { setPidRequired(!pidRequired); setFieldError("personalIdentificationNumber", undefined) }}
                                   />
                                   <ErrorAbleTextInput
                                        name={pidFieldName}
                                        placeholder={"pid"} />
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group widths={'equal'}>
                                   <ErrorAbleDateInput
                                        name='birthDate'
                                        placeholderText={'date'}
                                        dateFormat='yyyy-MM-dd'
                                   />
                                   <ErrorAbleTextInput
                                        name='email'
                                        placeholder={"email"} />
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group widths={1}>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={Gender[Gender.Male]}
                                             name='gender'
                                             value={Gender.Male}
                                             onChange={() => setFieldValue('gender', Gender.Male)}
                                             checked={values.gender === Gender.Male}
                                        />
                                   </SemanticUIForm.Field>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={Gender[Gender.Female]}
                                             name='gender'
                                             value={Gender.Female}
                                             onChange={() => setFieldValue('gender', Gender.Female)}
                                             checked={values.gender === Gender.Female}
                                        />
                                   </SemanticUIForm.Field>
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group widths={1}>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={Nationality[Nationality.Czech]}
                                             name='nationality'
                                             value={Nationality.Czech}
                                             onChange={() => setFieldValue('nationality', Nationality.Czech)}
                                             checked={values.nationality === Nationality.Czech}
                                        />
                                   </SemanticUIForm.Field>
                                   <SemanticUIForm.Field>
                                        <SemanticUIForm.Radio
                                             label={Nationality[Nationality.English]}
                                             name='nationality'
                                             value={Nationality.English}
                                             onChange={() => setFieldValue('nationality', Nationality.English)}
                                             checked={values.nationality === Nationality.English}
                                        />
                                   </SemanticUIForm.Field>
                              </SemanticUIForm.Group>
                              <SemanticUIForm.Group>
                                   <SemanticUIForm.Checkbox
                                        name='agreementGDPR'
                                        label='Souhlasim s GDPR'
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
                                   content='Submit'
                                   type='submit'
                                   size='large'
                              />
                         </Form>
                    )}
               </Formik>
          </Segment >
     )
};
