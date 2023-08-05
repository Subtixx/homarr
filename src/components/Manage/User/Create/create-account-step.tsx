import { Button, Card, Flex, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconArrowRight, IconAt, IconUser } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

interface CreateAccountStepProps {
  nextStep: ({ eMail, username }: { username: string; eMail: string }) => void;
  defaultUsername: string;
  defaultEmail: string;
}

export const CreateAccountStep = ({ defaultEmail, defaultUsername, nextStep }: CreateAccountStepProps) => {
  const form = useForm({
    initialValues: {
      username: defaultUsername,
      eMail: defaultEmail,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: zodResolver(createAccountStepValidationSchema),
  });

  const { t } = useTranslation('user/create');

  return (
    <Card mih={400}>
      <TextInput
        icon={<IconUser size="0.8rem" />}
        label={t('steps.account.username.label')}
        variant="filled"
        mb="md"
        withAsterisk
        {...form.getInputProps('username')}
      />
      <TextInput
        icon={<IconAt size="0.8rem" />}
        label={t('steps.account.email.label')}
        variant="filled"
        mb="md"
        {...form.getInputProps('eMail')}
      />

      <Flex justify="end" wrap="nowrap">
        <Button
          rightIcon={<IconArrowRight size="1rem" />}
          disabled={!form.isValid()}
          onClick={() => {
            nextStep({
              username: form.values.username,
              eMail: form.values.eMail,
            });
          }}
          variant="light"
          px="xl"
        >
          {t('buttons.next')}
        </Button>
      </Flex>
    </Card>
  );
};

export const createAccountStepValidationSchema = z.object({
  username: z.string().min(1).max(100),
  eMail: z.string().email().or(z.literal('')),
});
