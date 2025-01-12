<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReplyNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $replyContent; // Nội dung trả lời
    public $customerName; // Tên khách hàng

    /**
     * Create a new message instance.
     */
    public function __construct()
    {
        $this->replyContent = $replyContent;
        $this->customerName = $customerName;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reply Notification Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.name',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    public function build()
    {
        return $this->subject('Thông báo: Đánh giá của bạn đã được trả lời')
                    ->view('emails.reply_notification'); // Đi tới view email
    }
}
