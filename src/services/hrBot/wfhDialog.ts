import { Request, Response } from 'express';

export const wfhDialog = (req: Request, res: Response) => {
  console.log('🚀 ------------------------------------------------🚀');
  console.log('🚀 ~ file: wfhDialog.ts:4 ~ wfhDialog ~ req:', req.body);
  console.log('🚀 ------------------------------------------------🚀');
  return res.json({
    action_response: {
      type: 'DIALOG',
      dialog_action: {
        dialog: {
          body: {
            sections: [
              {
                header: 'Choose date',
                widgets: [
                  {
                    dateTimePicker: {
                      label: 'Date',
                      type: 'DATE_ONLY',
                      name: 'date',
                      valueMsEpoch: Date.now() + '',
                    },
                  },
                  {
                    buttonList: {
                      buttons: [
                        {
                          text: 'Submit',
                          onClick: {
                            action: {
                              function: 'openSequentialDialog',
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    },
  });
};
