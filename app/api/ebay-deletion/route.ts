import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const challengeCode = searchParams.get('challenge_code')

  if (!challengeCode) {
    return NextResponse.json({ error: 'No challenge code' }, { status: 400 })
  }

  const verificationToken = process.env.EBAY_VERIFICATION_TOKEN || 'foilcase-verification-token-12345'
  const endpoint = 'https://www.foilcase.com/api/ebay-deletion'

  const hash = crypto.createHash('sha256')
  hash.update(challengeCode)
  hash.update(verificationToken)
  hash.update(endpoint)
  const challengeResponse = hash.digest('hex')

  return NextResponse.json({ challengeResponse })
}

export async function POST(request: NextRequest) {
  // Handle account deletion notifications
  // In production you would delete the user's data here
  console.log('eBay account deletion notification received')
  return NextResponse.json({ success: true })
}