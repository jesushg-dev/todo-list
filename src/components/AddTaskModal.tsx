import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (description: string) => void;
}

export default function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const [text, setText] = useState('');
  const [showError, setShowError] = useState(false);
  const theme = useTheme();

  const handleAdd = () => {
    if (text.trim().length === 0) {
      setShowError(true);
      return;
    }
    onAdd(text.trim());
    setText('');
    setShowError(false);
    onClose();
  };

  const isButtonDisabled = text.trim().length === 0;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={[styles.modalContainer, { backgroundColor: theme.background }]}
            >
              <ThemedText type="subtitle" style={styles.modalTitle}>
                Create New Task
              </ThemedText>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.backgroundSelected,
                    backgroundColor: theme.backgroundElement,
                  },
                ]}
                placeholder="New Task Name"
                placeholderTextColor={theme.textSecondary}
                value={text}
                onChangeText={(val) => {
                  setText(val);
                  if (showError) setShowError(false);
                }}
                autoFocus
                maxLength={100}
              />

              {showError && (
                <ThemedText style={styles.errorText}>
                  Task description cannot be empty
                </ThemedText>
              )}

              <View style={styles.buttonRow}>
                <Button
                  variant="secondary"
                  title="Cancel"
                  onPress={onClose}
                  style={styles.modalButton}
                />

                <Button
                  variant="primary"
                  title="Add"
                  onPress={handleAdd}
                  disabled={isButtonDisabled}
                  style={styles.modalButton}
                />
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 340,
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  modalButton: {
    minWidth: 80,
    minHeight: 40,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: -Spacing.two,
  },
});
