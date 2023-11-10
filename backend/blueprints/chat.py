from flask import Blueprint, request, make_response, jsonify, session

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    sender = data.get('sender')
    recipient = data.get('recipient')
    content = data.get('content')

    if not sender or not recipient or not content:
        return jsonify({"error": "Incomplete data"}), 400

    message = Message(sender=sender, recipient=recipient, content=content)
    db.session.add(message)
    db.session.commit()

    return jsonify({"message": "Message sent"})


@app.route('/get_messages', methods=['GET'])
def get_messages():
    recipient = request.args.get('recipient')
    if not recipient:
        return jsonify({"error": "Recipient not specified"}), 400

    messages = Message.query.filter_by(recipient=recipient).all()
    messages = [{"sender": msg.sender, "content": msg.content} for msg in messages]

    return jsonify({"messages": messages})


