import { Toast, useToastState } from '@tamagui/toast'
import { YStack } from 'tamagui'

export function CurrentToast() {
  const currentToast = useToastState()

  if (!currentToast) return null

  return (
    <Toast
      key={currentToast.id}
      duration={3000}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      // y={isWeb ? '$12' : 0}
      theme="accent"
      marginTop="$4"
      borderRadius="$4"
      animation="quick"
    >
      <YStack alignItems="center" padding="$2" gap="$2">
        <Toast.Title fontWeight="bold">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}