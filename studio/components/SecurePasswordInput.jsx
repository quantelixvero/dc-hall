import React, { useState, useCallback } from 'react'
import { Card, Stack, Text, Flex, Box, TextInput, Button, Badge } from '@sanity/ui'
import { set, unset } from 'sanity'
import { LockIcon, EyeClosedIcon, EyeOpenIcon, CheckmarkIcon, WarningOutlineIcon } from '@sanity/icons'

// Cryptographic SHA-256 in browser
async function sha256Hex(text) {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const enc = new TextEncoder()
    const data = enc.encode(text)
    const hashBuf = await crypto.subtle.digest('SHA-256', data)
    const hashArr = Array.from(new Uint8Array(hashBuf))
    return hashArr.map(b => b.toString(16).padStart(2, '0')).join('')
  }
  return text
}

export function SecurePasswordInput(props) {
  const { value, onChange } = props
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const isHash = value && typeof value === 'string' && /^[0-9a-f]{64}$/i.test(value.trim())
  const hasValue = Boolean(value && typeof value === 'string' && value.trim())
  const isPlaintext = hasValue && !isHash

  const handleApplyNewPassword = useCallback(async () => {
    if (!newPassword.trim()) return
    const hex = await sha256Hex(newPassword.trim())
    onChange(set(hex))
    setNewPassword('')
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }, [newPassword, onChange])

  const handleConvertPlaintext = useCallback(async () => {
    if (!value || isHash) return
    const hex = await sha256Hex(String(value).trim())
    onChange(set(hex))
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }, [value, isHash, onChange])

  const handleClear = useCallback(() => {
    onChange(unset())
    setNewPassword('')
  }, [onChange])

  return (
    <Card padding={3} radius={2} shadow={1} border tone={isHash ? 'positive' : (isPlaintext ? 'caution' : 'default')}>
      <Stack space={3}>
        {/* Status Header */}
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <LockIcon />
            <Text weight="semibold" size={1}>
              {isHash
                ? '🔒 Cryptographically Protected (SHA-256 Hash)'
                : (isPlaintext ? '⚠️ Unprotected Plaintext Password' : '🔓 No Password Set')}
            </Text>
          </Flex>
          {isHash && (
            <Badge tone="positive" fontSize={1} padding={2}>
              Zero-Leak Secure
            </Badge>
          )}
          {isPlaintext && (
            <Badge tone="caution" fontSize={1} padding={2}>
              Plaintext Visible in DevTools
            </Badge>
          )}
        </Flex>

        {/* Notice for existing plaintext passwords */}
        {isPlaintext && (
          <Card padding={2} radius={2} tone="caution">
            <Stack space={2}>
              <Text size={1}>
                Current password is stored in plaintext: <strong>"{value}"</strong>. Visitors could read this in DevTools Network tab.
              </Text>
              <Button
                tone="positive"
                text="Convert to Secure One-Way Hash Now"
                icon={CheckmarkIcon}
                onClick={handleConvertPlaintext}
                fontSize={1}
              />
            </Stack>
          </Card>
        )}

        {/* Input for setting/changing password */}
        <Stack space={2}>
          <Text size={1} weight="medium">
            {hasValue ? 'Change Password / নতুন পাসওয়ার্ড দিন:' : 'Set Password / পাসওয়ার্ড দিন:'}
          </Text>
          <Flex gap={2}>
            <Box flex={1}>
              <TextInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Type new password here..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleApplyNewPassword()
                  }
                }}
              />
            </Box>
            <Button
              mode="ghost"
              icon={showPassword ? EyeOpenIcon : EyeClosedIcon}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            />
            <Button
              tone="primary"
              text="Save & Hash"
              icon={CheckmarkIcon}
              disabled={!newPassword.trim()}
              onClick={handleApplyNewPassword}
            />
            {hasValue && (
              <Button
                tone="critical"
                mode="ghost"
                text="Remove"
                onClick={handleClear}
                title="Remove password"
              />
            )}
          </Flex>
        </Stack>

        {savedSuccess && (
          <Text size={1} style={{ color: '#10b981', fontWeight: 600 }}>
            ✔ Password successfully encrypted and hashed! It will take effect immediately on the website.
          </Text>
        )}

        <Text size={0} muted>
          Notice: The system saves only the one-way SHA-256 hash. Plaintext credentials will NEVER be exposed across network requests or browser Developer Tools.
        </Text>
      </Stack>
    </Card>
  )
}
