<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Low Credits Notification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 20px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2d3748;
        }
        .message {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 15px;
        }
        .credits-info {
            background-color: #fed7d7;
            border-left: 4px solid #f56565;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .credits-info .number {
            font-size: 24px;
            font-weight: bold;
            color: #e53e3e;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
        }
        .footer {
            background-color: #f7fafc;
            padding: 20px;
            text-align: center;
            color: #718096;
            font-size: 14px;
        }
        .emoji {
            font-size: 20px;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><span class="emoji">🏋️‍♀️</span> Fitness Studio</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hi {{ $client->name }}! 👋
            </div>
            
            <div class="message">
                We hope you're enjoying your fitness journey with us! We wanted to give you a heads up that your workout credits are running low.
            </div>
            
            <div class="credits-info">
                <div style="display: flex; align-items: center;">
                    <span class="emoji">⚠️</span>
                    <div>
                        <strong>Credits Remaining:</strong>
                        <div class="number">{{ $creditsRemaining }}</div>
                        <small>{{ $subscriptionType }} Package</small>
                    </div>
                </div>
            </div>
            
            <div class="message">
                To continue booking your favorite workouts and maintain your fitness routine, please contact us to top up your credits. Don't let anything interrupt your progress!
            </div>
            
            <div style="text-align: center;">
                <a href="mailto:info@fitnessstudio.com" class="cta-button">
                    💬 Contact Us to Top Up
                </a>
            </div>
            
            <div class="message" style="margin-top: 30px;">
                <span class="emoji">💪</span> We look forward to seeing you at your next workout and helping you achieve your fitness goals!
            </div>
        </div>
        
        <div class="footer">
            <p>
                <span class="emoji">📧</span> 
                If you have any questions, reply to this email or contact us at info@fitnessstudio.com
            </p>
            <p style="margin-top: 10px; font-size: 12px;">
                This is an automated notification to help you stay on track with your fitness journey.
            </p>
        </div>
    </div>
</body>
</html>