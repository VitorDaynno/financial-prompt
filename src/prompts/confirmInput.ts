import { confirm } from '@inquirer/prompts';


export const confirmInput = async (
  message: string,
  defaultValue = true
): Promise<boolean> => {
  const isConfirmed = await confirm({
    message,
    default: defaultValue,
    transformer: (value) => value ? 'Sim': 'Não'
  });

  return isConfirmed;
};
